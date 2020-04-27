package controllers

import javax.inject._
import models.{Category, User, UserRepository}
import play.api.data.Form
import play.api.data.Forms._
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}


@Singleton
class UserController @Inject()( userRepo: UserRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext) extends MessagesAbstractController(cc) {

  val productForm: Form[CreateUserForm] = Form {
    mapping(
      "firstName" -> nonEmptyText,
      "lastName" -> nonEmptyText,
      "email" -> nonEmptyText,
      "address" -> nonEmptyText
    ) (CreateUserForm.apply)(CreateUserForm.unapply)
  }



  def getUsers: Action[AnyContent] = Action.async { implicit request =>
    val users = userRepo.list()
    users.map( users => Ok(views.html.users(users)))
  }

  def getUser: Action[AnyContent] = Action.async { implicit request =>
    val users = userRepo.list()
    users.map( users => Ok(views.html.users(users)))
  }

  def delete(id: Long): Action[AnyContent] = Action {
    userRepo.delete(id)
    Redirect("/users")
  }

  def update(id: Long): Action[AnyContent] = Action.async { implicit request: MessagesRequest[AnyContent] =>
    var categ:Seq[Category] = Seq[Category]()
    val categories = userRepo.list().onComplete{
      case Success(cat) => categ = cat
      case Failure(_) => print("fail")
    }

    val user = userRepo.getById(id)
    user.map(user => {
      Ok("ok")
    })
  }

  def insert: Action[AnyContent] = Action.async { implicit request: MessagesRequest[AnyContent] =>
    val categories = userRepo.list()
    categories.map (cat => Ok("ok"))
  }

}
//
case class CreateUserForm(firstName: String, lastName: String, email: String, address: String)
//case class UpdateProductForm(id: Long, name: String, description: String, category: Int)