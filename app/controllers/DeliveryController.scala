package controllers

import javax.inject._
import models.{DeliveryRepository}
import play.api.data.Form
import play.api.data.Forms._
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}


@Singleton
class DeliveryController @Inject()( userRepo: DeliveryRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext) extends MessagesAbstractController(cc) {


  //    def getAll: Action[AnyContent] = Action.async { implicit request =>
  //        val deliveries = warehouse.list()
  //
  //        deliveries.map( a => Ok("ok")
  //    }
  //
  //    def get: Action[AnyContent] = Action.async { implicit request =>
  //        val deliveries = warehouse.list()
  //
  //        deliveries.map( a => Ok("ok")  }
  //
  //    def delete(id: Long): Action[AnyContent] = Action {
  //        val deliveries = warehouse.list()
  //
  //        deliveries.map( a => Ok("ok")
  //    }
  //
  //    def update(id: Long): Action[AnyContent] = Action.async { implicit request: MessagesRequest[AnyContent] =>
  //        val deliveries = warehouse.list()
  //
  //        deliveries.map( a => Ok("ok")
  //    }
  //
  //    def insert: Action[AnyContent] = Action.async { implicit request: MessagesRequest[AnyContent] =>
  //        val deliveries = warehouse.list()
  //
  //        deliveries.map( a => Ok("ok")
  //
  //    }
}
