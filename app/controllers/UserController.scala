package controllers

import javax.inject._
import models.{User, UserRepository}
import play.api.data.Form
import play.api.data.Forms._
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}


@Singleton
class UserController @Inject()( userRepo: UserRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext) extends MessagesAbstractController(cc) {

  val productForm: Form[CreateUserForm] = Form {
    mapping(
      "firstName" -> nonEmptyText,
      "lastName" -> nonEmptyText,
      "email" -> nonEmptyText,
      "address" -> nonEmptyText
    )(CreateUserForm.apply)(CreateUserForm.unapply)
  }

//  val updateProductForm: Form[UpdateProductForm] = Form {
//    mapping(
//      "id" -> longNumber,
//      "name" -> nonEmptyText,
//      "description" -> nonEmptyText,
//      "category" -> number,
//    )(UpdateProductForm.apply)(UpdateProductForm.unapply)
//  }



  def getUSer: Action[AnyContent] = Action.async { implicit request =>
    val users = userRepo.list()
    users.map( users => Ok(views.html.users(users)))
  }

  def getUsers: Action[AnyContent] = Action.async { implicit request =>
    val users = userRepo.list()
    users.map( users => Ok(views.html.users(users)))
  }
}
//
case class CreateUserForm(firstName: String, lastName: String, email: String, address: String)
//case class UpdateProductForm(id: Long, name: String, description: String, category: Int)