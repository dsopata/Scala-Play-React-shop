package models

import java.util.UUID

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.duration.Duration
import scala.concurrent.{ Await, ExecutionContext, Future }

@Singleton
class RatingRepository @Inject() (
  dbConfigProvider: DatabaseConfigProvider,
  productRepository: ProductRepository,
  userRepository: UserRepository
)(implicit ec: ExecutionContext) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]
  import dbConfig._
  import productRepository.ProductTable
  import userRepository.UserTable
  import profile.api._

  private val ratings = TableQuery[RatingTable]
  private val products = TableQuery[ProductTable]
  private val users = TableQuery[UserTable]

  def createOrReplace(userId: UUID, productId: Int, value: Int): Future[Rating] = {
    findByProductIdAndUserId(productId, userId).flatMap {
      case Some(rating) => update(Rating(rating.id, userId, productId, value))
      case None => save(Rating(UUID.randomUUID(), userId, productId, value))
    }
  }

  def getProductRating(productId: Int): Seq[Int] = {
    var ratingSeq = db.run(ratings.filter(_.productId === productId).map(_.value).result)
    Await.result(ratingSeq, Duration.Inf)
  }

  private def update(updateRating: Rating): Future[Rating] = db.run {
    ratings
      .filter(_.productId === updateRating.productId).filter(_.userId === updateRating.userId)
      .update(updateRating).map(_ => updateRating)
  }

  private def save(rating: Rating): Future[Rating] = {
    val insertAction = (ratings += rating).flatMap {
      case 0 => DBIO.failed(new Exception("Failed to insert `Rating` object"))
      case _ => DBIO.successful(rating)
    }
    db.run(insertAction)
  }

  private def findByProductIdAndUserId(productId: Int, userId: UUID): Future[Option[Rating]] = db.run {
    ratings.filter(_.productId === productId).filter(_.userId === userId).result.headOption
  }

  class RatingTable(tag: Tag) extends Table[Rating](tag, "rating") {
    def id = column[UUID]("id", O.PrimaryKey)
    def userId = column[UUID]("userId")
    def productId = column[Int]("productId")
    def value = column[Int]("value")
    def * = (id, userId, productId, value) <> ((Rating.apply _).tupled, Rating.unapply)
    private def fKeyRatings_products = foreignKey("fKeyRatings_products", productId, products)(_.id)
    private def fKeyRatings_users = foreignKey("fKeyRatings_users", userId, users)(_.id)

  }
}
