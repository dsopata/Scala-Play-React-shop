package controllers

import com.mohiva.play.silhouette.api.Silhouette
import javax.inject.Inject
import models.{ CategoryRepository, ProductRepository, UserRepository }
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.format.Formats._
import play.api.libs.json.Json
import play.api.mvc.{ Action, AnyContent, MessagesAbstractController, MessagesControllerComponents }
import utils.auth.DefaultEnv

import scala.concurrent.{ ExecutionContext, Future }

class ProductController @Inject() (
  productsRepo: ProductRepository,
  categoryRepo: CategoryRepository,
  cc: MessagesControllerComponents,
  userRepository: UserRepository,
  silhouette: Silhouette[DefaultEnv]
)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val productForm: Form[CreateProductForm] = Form {
    mapping(
      "name" -> nonEmptyText,
      "description" -> nonEmptyText,
      "price" -> of[Double],
      "category" -> number
    )(CreateProductForm.apply)(CreateProductForm.unapply)
  }

  def getProducts: Action[AnyContent] = Action.async { implicit request =>
    productsRepo.list().map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getProductById(id: Int): Action[AnyContent] = Action.async { implicit request =>
    productsRepo.findById(id).map { p =>
      Ok(Json.toJson(p))
    }
  }

  def getByCategory(id: Int): Action[AnyContent] = Action.async { implicit request =>
    productsRepo.getByCategory(id).map { products =>
      Ok(Json.toJson(products))
    }
  }

  def getByCategories(categories: List[Int]): Action[AnyContent] = Action.async { implicit request =>
    productsRepo.getByCategories(categories).map { products =>
      Ok(Json.toJson(products))
    }
  }

  def create: Action[AnyContent] = Action.async { implicit request =>
    val name = request.body.asJson.get("name").as[String]
    val description = request.body.asJson.get("description").as[String]
    val price = request.body.asJson.get("price").as[String].toDouble
    val category = Integer.valueOf(request.body.asJson.get("category").as[String])
    val image = request.body.asJson.get("image").as[String]

    productsRepo.create(name, description, price, category, image).map { product =>
      Ok(Json.toJson(product))
    }
  }

  def update(productId: Int): Action[AnyContent] = Action.async { implicit request =>
    val name = request.body.asJson.get("name").as[String]
    val description = request.body.asJson.get("description").as[String]
    val price = request.body.asJson.get("price").as[String].toDouble
    val category = Integer.valueOf(request.body.asJson.get("category").as[String])
    val image = request.body.asJson.get("image").as[String]

    productsRepo.update(productId, name, description, price, category, image).map { product =>
      Ok(Json.toJson(product))
    }
  }

  def delete(id: Int): Action[AnyContent] = silhouette.SecuredAction.async { implicit request =>
    val userId = request.identity.userID
    if (userRepository.isUserAdmin(userId)) {
      productsRepo.delete(id)
      Future.successful(Ok(Json.toJson("response" -> true)))
    } else {
      Future.successful(Unauthorized(Json.obj("response" -> false)))
    }
  }
}

case class CreateProductForm(name: String, description: String, price: Double, category: Int)
