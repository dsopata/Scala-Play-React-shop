package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import java.sql.Date

import scala.concurrent.{ ExecutionContext, Future }

@Singleton
class CommentRepository @Inject() (
  dbConfigProvider: DatabaseConfigProvider,
  productRepository: ProductRepository
)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]
  import dbConfig._
  import profile.api._
  import productRepository.ProductTable

  private val products = TableQuery[ProductTable]
  private val comments = TableQuery[CommentTable]

  def create(userName: String, userAvatar: String, productId: Int, createdDate: Date, text: String): Future[Comment] = db.run {
    (comments.map(p => (p.userName, p.userAvatar, p.productId, p.createdDate, p.text))
      returning comments.map(_.id)
      into {
        case ((`userName`, `userAvatar`, `productId`, `createdDate`, `text`), id) =>
          Comment(id, userName, userAvatar, productId, createdDate, text)
      }) += (userName, userAvatar, productId, createdDate, text)
  }

  def findByProductId(productId: Int): Future[Seq[Comment]] = db.run {
    comments.filter(_.productId === productId).sortBy(_.createdDate).result
  }

  def deleteByCommentId(id: Int): Future[Unit] = db.run(comments.filter(_.id === id).delete).map(_ => ())

  class CommentTable(tag: Tag) extends Table[Comment](tag, "comments") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def userName = column[String]("userName")
    def userAvatar = column[String]("userAvatar")
    def productId = column[Int]("productId")
    def createdDate = column[Date]("createdDate")
    def text = column[String]("text")
    def * = (id, userName, userAvatar, productId, createdDate, text) <> ((Comment.apply _).tupled, Comment.unapply)
    private def fKeycomments_products = foreignKey("fKeycomments_products", productId, products)(_.id)
  }
}
