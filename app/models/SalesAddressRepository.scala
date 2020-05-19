package models

import java.util.UUID

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class SalesAddressRepository @Inject() (
  dbConfigProvider: DatabaseConfigProvider
)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private val salesAddress = TableQuery[SalesAddressTable]

  def create(addressId: UUID, street: String, city: String, postalCode: String, country: String): Future[SalesAddress] = {

    val newSalesAddress = SalesAddress(addressId, street, city, postalCode, country)
    val insertAction = (salesAddress += newSalesAddress).flatMap {
      case 0 => DBIO.failed(new Exception("Failed to insert `models.SalesAddress` object"))
      case _ => DBIO.successful(newSalesAddress)
    }
    db.run(insertAction)
  }

  def list(): Future[Seq[SalesAddress]] = db.run {
    salesAddress.result
  }

  def findById(id: UUID): Future[SalesAddress] = db.run {
    salesAddress.filter(_.id === id).result.head
  }

  class SalesAddressTable(tag: Tag) extends Table[SalesAddress](tag, "orderAddress") {
    def id = column[UUID]("id", O.PrimaryKey)
    def street = column[String]("street")
    def city = column[String]("city")
    def postalCode = column[String]("postalCode")
    def country = column[String]("country")

    def * = (id, street, city, postalCode, country) <> ((SalesAddress.apply _).tupled, SalesAddress.unapply)
  }

}
