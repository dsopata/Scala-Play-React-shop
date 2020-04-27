package controllers;

import play.api.mvc.AnyContent;

import java.awt.*;

public class CommentController {

    def getAll: Desktop.Action[AnyContent] = Desktop.Action.async { implicit request =>
        val comments = warehouse.list()

        comments.map( a => Ok("ok")
    }

    def get: Desktop.Action[AnyContent] = Desktop.Action.async { implicit request =>
        val comments = warehouse.list()

        comments.map( a => Ok("ok")  }

    def delete(id: Long): Desktop.Action[AnyContent] = Desktop.Action

    {
        val comments = warehouse.list()

        comments.map( a => Ok("ok")
    }

    def update(id: Long): Desktop.Action[AnyContent] = Desktop.Action.async { implicit request: MessagesRequest[AnyContent] =>
        val comments = warehouse.list()

        comments.map( a => Ok("ok")
    }

    def insert: Desktop.Action[AnyContent] = Desktop.Action.async { implicit request: MessagesRequest[AnyContent] =>
        val comments = warehouse.list()

        comments.map( a => Ok("ok")

    }

}
