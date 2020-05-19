package models

import play.api.libs.json.{ Json, OFormat }

case class OrderStatus(id: Int, name: String)

object OrderStatus {
  implicit val orderStatusFormat: OFormat[OrderStatus] = Json.format[OrderStatus]
}
