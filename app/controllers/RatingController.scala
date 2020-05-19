package controllers

import java.util.UUID

import com.mohiva.play.silhouette.api.Silhouette
import javax.inject.Inject
import models.RatingRepository
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.format.Formats._
import play.api.libs.json.Json
import play.api.mvc.{ Action, AnyContent, MessagesAbstractController, MessagesControllerComponents }
import utils.auth.DefaultEnv

import scala.concurrent.{ ExecutionContext, Future }

class RatingController @Inject() (ratingRepo: RatingRepository, cc: MessagesControllerComponents,
  silhouette: Silhouette[DefaultEnv])(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  val ratingForm: Form[CreateRatingForm] = Form {
    mapping(
      "id" -> of[UUID],
      "userId" -> of[UUID],
      "productId" -> number,
      "value" -> of[Int]
    )(CreateRatingForm.apply)(CreateRatingForm.unapply)
  }

  def addRatingToProduct(productId: Int): Action[AnyContent] = silhouette.SecuredAction.async { implicit request =>
    val userId = request.identity.userID
    val value = request.body.asJson.get("value").as[Int]

    ratingRepo.createOrReplace(userId, productId, value).map(p => {
      val rating = ratingRepo.getProductRating(productId)
      Ok(Json.toJson(average(rating)))
    })
  }

  def getProductRating(productId: Int): Action[AnyContent] = Action.async { implicit request =>
    val rating = ratingRepo.getProductRating(productId)
    Future.successful(Ok(Json.toJson(average(rating))))
  }

  private def average(seq: Seq[Int]): Double = seq.foldLeft((0.0, 1)) { case ((avg, count), next) => (avg + (next - avg) / count, count + 1) }._1

}

case class CreateRatingForm(id: UUID, userId: UUID, productId: Int, value: Int)

