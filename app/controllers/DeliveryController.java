package controllers

import java.awt.Desktop.Action

import akka.http.scaladsl.model.HttpHeader.ParsingResult.Ok
import play.api.mvc.{Action, AnyContent, MessagesRequest}

public class DeliveryController {

    def getAll: Action[AnyContent] = Action.async { implicit request =>
        val deliveries = warehouse.list()

        deliveries.map( a => Ok("ok")
    }

    def get: Action[AnyContent] = Action.async { implicit request =>
        val deliveries = warehouse.list()

        deliveries.map( a => Ok("ok")  }

    def delete(id: Long): Action[AnyContent] = Action {
        val deliveries = warehouse.list()

        deliveries.map( a => Ok("ok")
    }

    def update(id: Long): Action[AnyContent] = Action.async { implicit request: MessagesRequest[AnyContent] =>
        val deliveries = warehouse.list()

        deliveries.map( a => Ok("ok")
    }

    def insert: Action[AnyContent] = Action.async { implicit request: MessagesRequest[AnyContent] =>
        val deliveries = warehouse.list()

        deliveries.map( a => Ok("ok")

    }
}
