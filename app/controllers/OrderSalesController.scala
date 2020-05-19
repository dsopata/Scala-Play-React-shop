package controllers

import java.sql.Date
import java.util.UUID

import javax.inject.Inject
import models.{ OrderProduct, OrderProductRepository, OrderStatusRepository, SalesAddressRepository, OrderSalesRepository, UserRepository }
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.format.Formats._
import play.api.libs.json.{ JsArray, JsObject, Json }
import play.api.mvc.{ Action, AnyContent, MessagesAbstractController, MessagesControllerComponents }

import scala.collection.mutable.ListBuffer
import scala.concurrent.ExecutionContext

class OrderSalesController @Inject() (
  orderSalesRepository: OrderSalesRepository,
  salesAddressRepository: SalesAddressRepository,
  orderRepository: OrderProductRepository,
  userRepository: UserRepository,
  cc: MessagesControllerComponents,
  orderStatusRepository: OrderStatusRepository
)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val salesForm: Form[CreateSaleForm] = Form {
    mapping(
      "order_date" -> of[Date],
      "total" -> of[Double],
      "userId" -> number
    )(CreateSaleForm.apply)(CreateSaleForm.unapply)
  }

  def getSales: Action[AnyContent] = Action.async { implicit request =>
    orderSalesRepository.list().map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getSalesAdresses: Action[AnyContent] = Action.async { implicit request =>
    salesAddressRepository.list().map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getOrderStatus: Action[AnyContent] = Action.async { implicit request =>
    orderStatusRepository.list().map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getSaleById(id: UUID): Action[AnyContent] = Action.async { implicit request =>
    orderSalesRepository.findById(id).map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getByUserId(id: UUID): Action[AnyContent] = Action.async { implicit request =>
    orderSalesRepository.getByUserId(id).map { products =>
      Ok(Json.toJson(products))
    }
  }

  def getByRolesId(categories: List[UUID]): Action[AnyContent] = Action.async { implicit request =>
    orderSalesRepository.getByRolesId(categories).map { products =>
      Ok(Json.toJson(products))
    }
  }

  def create: Action[AnyContent] = Action.async { implicit request =>
    val order_date = new Date(request.body.asJson.get("order_date").as[Long])
    val total = request.body.asJson.get("total").as[Double]
    val userId = UUID.fromString(request.body.asJson.get("user_id").as[String])

    val salesAddressId = UUID.randomUUID();
    val street = request.body.asJson.get("addressStreet").as[String]
    val city = request.body.asJson.get("addressCity").as[String]
    val postalCode = request.body.asJson.get("addressPostalCode").as[String]
    val country = request.body.asJson.get("addressCountry").as[String]
    salesAddressRepository.create(salesAddressId, street, city, postalCode, country)

    val orderId = UUID.randomUUID();
    orderSalesRepository.create(orderId, order_date, total, userId, salesAddressId)

    /**
     *
     */

    val items = request.body.asJson.get("order").as[JsArray].value
    val orders: ListBuffer[OrderProduct] = ListBuffer[OrderProduct]()

    for (item <- items) {
      val name = item.asInstanceOf[JsObject].value("name").as[String]
      val price = item.asInstanceOf[JsObject].value("price").as[Double]
      orders += OrderProduct(UUID.randomUUID(), orderId, name, price)
    }

    orderRepository.createMany(orders.toList).map { s =>
      Ok(Json.toJson(s))
    }

    /**
     *
     */

  }

  def deleteSale(orderId: java.util.UUID) = Action.async { implicit request =>
    orderSalesRepository.deleteByOrderId(orderId)
    orderRepository.deleteByOrderId(orderId).map { s =>
      Ok(Json.toJson(s))
    }
  }
}

case class CreateSaleForm(order_date: Date, total: Double, userId: Int)

