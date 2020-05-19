package controllers

import java.util.UUID

import javax.inject.Inject
import models.{ OrderProductRepository, OrderSalesRepository }
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.format.Formats._
import play.api.libs.json.{ Json }
import play.api.mvc.{ Action, AnyContent, MessagesAbstractController, MessagesControllerComponents }

import scala.concurrent.ExecutionContext

class OrderProductController @Inject() (
  orderProduct: OrderProductRepository,
  orderSalesRepository: OrderSalesRepository,
  cc: MessagesControllerComponents
)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val orderForm: Form[CreateOrderForm] = Form {
    mapping(
      "orderId" -> of[UUID],
      "name" -> nonEmptyText,
      "price" -> of[Double]
    )(CreateOrderForm.apply)(CreateOrderForm.unapply)
  }

  def getOrderProducts: Action[AnyContent] = Action.async { implicit request =>
    orderProduct.list().map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getOrderProductById(id: UUID): Action[AnyContent] = Action.async { implicit request =>
    orderProduct.findById(id).map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getOrderProductsByOrderId(id: UUID): Action[AnyContent] = Action.async { implicit request =>
    orderProduct.getByOrderId(id).map { products =>
      Ok(Json.toJson(products))
    }
  }

  def updateOrderStatus(orderId: UUID): Action[AnyContent] = Action.async { implicit request =>
    val orderStatusId = request.body.asJson.get("orderStatusId").as[Int]

    orderSalesRepository.updateOrderStatus(orderId, orderStatusId).map { order =>
      Ok(Json.toJson(order))
    }
  }
}

case class CreateOrderForm(orderId: UUID, name: String, price: Double)

