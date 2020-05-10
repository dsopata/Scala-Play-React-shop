package models

import java.util.UUID

import com.mohiva.play.silhouette.api.LoginInfo
import javax.inject.{Inject, Singleton}
import models.daos.UserDAO
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class UserRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) extends UserDAO{
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class UserTable(tag: Tag) extends Table[User](tag, "user") {
    def id = column[UUID]("id", O.PrimaryKey, O.AutoInc)
    def firstName = column[Option[String]]("firstName")
    def lastName = column[Option[String]]("lastName")
    def email = column[Option[String]]("email")
    def isActive = column[Boolean]("activated")
    def providerID = column[String]("providerid")
    def providerKey = column[String]("providerkey")
    def roleId = column[Int]("roleID")

    def * = (id, providerID, providerKey, firstName,
      lastName, email, isActive, roleId) <> ((User.apply _).tupled, User.unapply)

  }

  private val user = TableQuery[UserTable]

  def find(loginInfo: LoginInfo): Future[Option[User]] = db.run {
    user.filter(_.providerID === loginInfo.providerID).filter(_.providerKey === loginInfo.providerKey).result.headOption
  }

  def find(id: UUID): Future[Option[User]] = db.run {
    user.filter(_.id === id).result.headOption
  }

  def list(): Future[Seq[User]] = db.run {
    user.result
  }

  def getById(id: UUID): Future[User] = db.run {
    user.filter(_.id === id).result.head
  }

  def save(_user: User): Future[User] = {
    val insertAction = (user += _user).flatMap {
      case _ => DBIO.successful(_user)
      case 0 => DBIO.failed(new Exception("Failed to insert `User` object"))
    }
    db.run(insertAction)
  }

  def delete(id: UUID): Future[Unit] = db.run(user.filter(_.id === id).delete).map(_ => ())

  def update(updateUser: User): Future[User] = db.run {
    user
      .filter(_.id === updateUser.id)
      .update(updateUser).map(_ => updateUser)
  }

}
