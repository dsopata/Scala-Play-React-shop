package models

import java.sql.Date
import java.util.UUID

import play.api.libs.json.{ Json, OFormat }

case class OrderSales(id: UUID, order_date: Date, total: Double, userId: UUID, orderStatusId: Int, salesAddressId: UUID)

object OrderSales {
  implicit val orderSalesFormat: OFormat[OrderSales] = Json.format[OrderSales]

}
