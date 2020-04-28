package models

import play.api.libs.json.Json

class CartItem(id: Long, userId: Long, itemId: Long) {

  object cartItem {
    implicit val cartItemFormat = Json.format[User]
  }

}

//case class User(id: Long, firstName: String, lastName: String, email: String, address: String)
//
//object User {
//  implicit val userFormat = Json.format[User]
//}