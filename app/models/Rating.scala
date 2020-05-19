package models

import java.util.UUID

import play.api.libs.json.{ Json, OFormat }

case class Rating(id: UUID, userId: UUID, productId: Int, value: Int)

object Rating {
  implicit val commentFormat: OFormat[Rating] = Json.format[Rating]
}

