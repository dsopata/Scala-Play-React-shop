package models

import java.sql.Date

import play.api.libs.json.{ Json, OFormat }

case class Comment(id: Int, userName: String, userAvatar: String, productId: Int, createdDate: Date, text: String)

object Comment {
  implicit val commentFormat: OFormat[Comment] = Json.format[Comment]
}

