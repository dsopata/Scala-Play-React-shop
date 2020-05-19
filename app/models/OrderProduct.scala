package models

import java.util.UUID

import play.api.libs.json.{ Json, OFormat }

case class OrderProduct(id: UUID, orderId: UUID, name: String, price: Double)

object OrderProduct {
  implicit val orderFormat: OFormat[OrderProduct] = Json.format[OrderProduct]
}
