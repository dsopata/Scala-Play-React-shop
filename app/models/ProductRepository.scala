package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class ProductRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, categoryRepository: CategoryRepository)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import categoryRepository.CategoryTable
  import dbConfig._
  import profile.api._

  private val product = TableQuery[ProductTable]
  private val category = TableQuery[CategoryTable]

  def create(name: String, description: String, price: Double, category: Int, image: String): Future[Product] = db.run {
    (product.map(p => (p.name, p.description, p.price, p.categoryId, p.image))
      returning product.map(_.id)
      into {
        case ((`name`, `description`, `price`, `category`, `image`), id) =>
          Product(id, name, description, price, category, image)
      }) += (name, description, price, category, image)
  }

  def update(id: Int, name: String, description: String, price: Double, category: Integer, image: String): Future[Int] = db.run {
    val newProduct = Product(id, name, description, price, category, image)
    product.filter(_.id === id).update(newProduct)
  }

  def delete(id: Int) = db.run(product.filter(_.id === id).delete).map(_ => ())

  def findById(id: Int): Future[Product] = db.run {
    product.filter(_.id === id).result.head
  }

  def list(): Future[Seq[Product]] = db.run {
    product.result
  }

  def getByCategory(category_id: Int): Future[Seq[Product]] = db.run {
    product.filter(_.categoryId === category_id).result
  }

  def getByCategories(category_ids: List[Int]): Future[Seq[Product]] = db.run {
    product.filter(_.categoryId inSet category_ids).result
  }

  class ProductTable(tag: Tag) extends Table[Product](tag, "products") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def description = column[String]("description")
    def quantity = column[Int]("quantity")
    def price = column[Double]("price")
    def categoryId = column[Int]("category")
    def image = column[String]("image")
    private def fKeycategory_products = foreignKey("fKeycategory_products", categoryId, category)(_.id)
    def * = (id, name, description, price, categoryId, image) <> ((Product.apply _).tupled, Product.unapply)
  }
}
