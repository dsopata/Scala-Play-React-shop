package models

import java.sql.Date
import java.util.UUID

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import play.api.mvc.Result
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class OrderSalesRepository @Inject() (
  dbConfigProvider: DatabaseConfigProvider,
  userRepository: UserRepository,
  salesAddressRepository: SalesAddressRepository,
  orderStatusRepository: OrderStatusRepository)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._
  import salesAddressRepository.SalesAddressTable
  import orderStatusRepository.OrderStatusTable

  private val orderSale = TableQuery[SalesOrderTable]
  private val orderStatus = TableQuery[OrderStatusTable]
  private val orderAddres = TableQuery[SalesAddressTable]

  import userRepository.UserTable

  private val user = TableQuery[UserTable]

  def create(salesId: UUID, order_date: Date, total: Double, userId: UUID, salesAddressId: UUID): Future[OrderSales] = {

    val newSalesOrder = OrderSales(salesId, order_date, total, userId, 1, salesAddressId);

    val insertAction = (orderSale += newSalesOrder).flatMap {
      case 0 => DBIO.failed(new Exception("Failed to insert `models.SalesOrder` object"))
      case _ => DBIO.successful(newSalesOrder)
    }
    db.run(insertAction)
  }

  def list(): Future[Seq[OrderSales]] = db.run {
    orderSale.result
  }

  def findById(id: UUID): Future[OrderSales] = db.run {
    orderSale.filter(_.id === id).result.head
  }

  def updateOrderStatus(orderID: UUID, orderStatusId: Int): Future[Int] = db.run {
    var order = orderSale.filter(_.id === orderID)
    order.map(_.orderStatusId).update(orderStatusId)
  }

  def getByUserId(category_id: UUID): Future[Seq[OrderSales]] = db.run {
    orderSale.filter(_.userId === category_id).result
  }

  def getByRolesId(category_ids: List[UUID]): Future[Seq[OrderSales]] = db.run {
    orderSale.filter(_.userId inSet category_ids).result
  }

  def deleteByOrderId(orderId: UUID): Future[Int] = db.run {
    orderSale.filter(_.id === orderId).delete
  }

  class SalesOrderTable(tag: Tag) extends Table[OrderSales](tag, "orderSales") {
    def id = column[UUID]("id", O.PrimaryKey)
    def order_date = column[Date]("order_date")
    def total = column[Double]("total")
    def userId = column[UUID]("userId")
    def orderStatusId = column[Int]("orderStatusId")
    def salesAddressId = column[UUID]("salesAddressId")
    def * = (id, order_date, total, userId, orderStatusId, salesAddressId) <> ((OrderSales.apply _).tupled, OrderSales.unapply)
    private def fKeyuser_sales_order = foreignKey("fKeyuser_sales_order", userId, user)(_.id)
    private def fKeyOrderStatusId = foreignKey("fKeyOrderStatusId", orderStatusId, orderStatus)(_.id)
    private def fkOrderAddres = foreignKey("fKeyOrderStatusId", salesAddressId, orderAddres)(_.id)

  }
}
