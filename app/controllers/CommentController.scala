package controllers

import java.sql.Date
import java.util.UUID

import com.mohiva.play.silhouette.api.Silhouette
import javax.inject.Inject
import models.{ Comment, CommentRepository, UserRepository }
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.format.Formats._
import play.api.libs.json.Json
import play.api.mvc.Results.Unauthorized
import play.api.mvc.{ Action, AnyContent, MessagesAbstractController, MessagesControllerComponents }
import utils.auth.DefaultEnv

import scala.concurrent.duration.Duration
import scala.concurrent.{ Await, ExecutionContext, Future }
import scala.util.{ Failure, Success }

class CommentController @Inject() (commentsRepo: CommentRepository, cc: MessagesControllerComponents, userRepository: UserRepository,
  silhouette: Silhouette[DefaultEnv])(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val commentForm: Form[CreateCommentForm] = Form {
    mapping(
      "id" -> of[Int],
      "userName" -> of[String],
      "userAvatar" -> of[String],
      "productId" -> number,
      "createdDate" -> of[Date],
      "text" -> nonEmptyText
    )(CreateCommentForm.apply)(CreateCommentForm.unapply)
  }

  def getCommentsByProductId(id: Int): Action[AnyContent] = Action.async { implicit request =>
    commentsRepo.findByProductId(id).map { p =>
      Ok(Json.toJson(p))
    }
  }

  def addComment(productId: Int): Action[AnyContent] = silhouette.SecuredAction.async { implicit request =>
    val text = request.body.asJson.get("text").as[String]
    val createdDate = new Date(request.body.asJson.get("createdDate").as[Long])
    val userName = request.body.asJson.get("userName").as[String]
    val userAvatar = request.body.asJson.get("userAvatar").as[String]

    commentsRepo.create(userName, userAvatar, productId, createdDate, text).map { comment =>
      Ok(Json.toJson(comment))
    }
  }

  def delete(commentId: Int): Action[AnyContent] = silhouette.SecuredAction.async { implicit request =>
    val userId = request.identity.userID

    if (userRepository.isUserAdmin(userId)) {
      commentsRepo.deleteByCommentId(commentId)
      Future.successful(Ok(Json.toJson("response" -> true)))
    } else {
      Future.successful(Unauthorized(Json.obj("response" -> false)))
    }
  }
}

case class CreateCommentForm(id: Int, userName: String, userAvatar: String, productId: Int, createdDate: Date, text: String)

