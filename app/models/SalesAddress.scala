package models

import java.util.UUID

import play.api.libs.json.{ Json, OFormat }

case class SalesAddress(id: UUID, street: String, city: String, postalCode: String, country: String)

object SalesAddress {
  implicit val rolesFormat: OFormat[SalesAddress] = Json.format[SalesAddress]
}
