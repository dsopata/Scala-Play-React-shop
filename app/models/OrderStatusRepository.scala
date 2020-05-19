package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class OrderStatusRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  val orderStatus = TableQuery[OrderStatusTable]

  def create(name: String): Future[OrderStatus] = db.run {
    (orderStatus.map(r => (r.name))
      returning orderStatus.map(_.id)
      into { case ((name), id) => OrderStatus(id, name) }
    ) += name
  }

  def list(): Future[Seq[OrderStatus]] = db.run {
    orderStatus.result
  }

  def findById(id: Int): Future[Option[OrderStatus]] = db.run {
    orderStatus.filter(_.id === id).result.headOption
  }

  class OrderStatusTable(tag: Tag) extends Table[OrderStatus](tag, "orderStatus") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def * = (id, name) <> ((OrderStatus.apply _).tupled, OrderStatus.unapply)
  }
}
