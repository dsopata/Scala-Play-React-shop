package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class WarehouseRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

    val dbConfig = dbConfigProvider.get[JdbcProfile]

    import dbConfig._
    import profile.api._

    class WarehouseTable(tag: Tag) extends Table[Warehouse](tag, "warehouse") {
      def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
      def name = column[String]("name")
      def * = (id, name) <> ((Warehouse.apply _).tupled, Warehouse.unapply)
    }

    val warehouse = TableQuery[WarehouseTable]

    def create(name: String): Future[Warehouse] = db.run {
      (warehouse.map(c => (c.name))
        returning warehouse.map(_.id)
        into ((name, id) => Warehouse(id, name))
        ) += (name)
    }

    def list(): Future[Seq[Warehouse]] = db.run {
      warehouse.result
    }
  
}