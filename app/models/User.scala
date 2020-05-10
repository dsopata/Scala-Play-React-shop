package models

import java.util.UUID
import com.mohiva.play.silhouette.api.Identity

import play.api.libs.json.Json

case class User(id: UUID, providerId: String, providerKey: String, firstName: Option[String],
                  lastName: Option[String], email: Option[String], activated: Boolean, roleId: Int) extends Identity

object User {
  implicit val userFormat = Json.format[User]
}

