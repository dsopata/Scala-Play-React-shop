package models

import play.api.libs.json._

class Warehouse(id: Int, name: String)

object Warehouse {
  implicit val warehouseFormat = Json.format[Warehouse]
}
//package models
//
//import play.api.libs.json._
//
//case class Category(id: Int, name: String)
//
//object Category {
//  implicit val categoryFormat = Json.format[Category]
//}