package models

import java.util.UUID

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class OrderProductRepository @Inject() (
  dbConfigProvider: DatabaseConfigProvider,
  orderStatusRepository: OrderStatusRepository,
  orderSalesRepository: OrderSalesRepository)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._
  import orderSalesRepository.SalesOrderTable

  private val order = TableQuery[OrderTable]
  private val orderSales = TableQuery[SalesOrderTable]

  def create(orderNew: OrderProduct): Future[OrderProduct] = {

    val insertAction = (order += orderNew).flatMap {
      case 0 => DBIO.failed(new Exception("Failed to insert `models.Order` object"))
      case _ => DBIO.successful(orderNew)
    }
    db.run(insertAction)
  }

  def createMany(list: List[OrderProduct]): Future[List[Int]] = {
    val toBeInserted = list.map { row => order += row }
    val inOneGo = DBIO.sequence(toBeInserted)
    db.run(inOneGo)
  }

  def list(): Future[Seq[OrderProduct]] = db.run {
    order.result
  }

  def findById(id: UUID): Future[OrderProduct] = db.run {
    order.filter(_.id === id).result.head
  }

  def getByOrderId(category_id: UUID): Future[Seq[OrderProduct]] = db.run {
    order.filter(_.orderId === category_id).result
  }

  def getByOrderIds(category_ids: List[UUID]): Future[Seq[OrderProduct]] = db.run {
    order.filter(_.orderId inSet category_ids).result
  }

  def deleteByOrderId(orderId: UUID): Future[Int] = db.run {
    order.filter(_.orderId === orderId).delete
  }

  private class OrderTable(tag: Tag) extends Table[OrderProduct](tag, "orderProducts") {
    def id = column[UUID]("id", O.PrimaryKey)
    def orderId = column[UUID]("orderId")
    def name = column[String]("name")
    def price = column[Double]("price")
    def * = (id, orderId, name, price) <> ((OrderProduct.apply _).tupled, OrderProduct.unapply)
    def fKeyorderSales_orderProducts = foreignKey("fKeyorderSales_orderProducts", orderId, orderSales)(_.id)

  }
}
