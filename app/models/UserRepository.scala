package models

import java.util.UUID

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.impl.providers.{ CommonSocialProfile, CredentialsProvider }
import javax.inject.Inject
import models.daos.UserDAO
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.duration.Duration
import scala.concurrent.{ Await, ExecutionContext, Future }
import scala.util.{ Failure, Success }

class UserRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, val rolesRepository: RoleRepository)(implicit ec: ExecutionContext) extends UserDAO {
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  val user = TableQuery[UserTable]
  import rolesRepository.RolesTable
  private val role = TableQuery[RolesTable]

  def save(userToAdd: User): Future[User] = {
    val insertAction = (user += userToAdd).flatMap {
      case 0 => DBIO.failed(new Exception("Failed to insert `User` object"))
      case _ => DBIO.successful(userToAdd)
    }
    db.run(insertAction)
  }

  def list(): Future[Seq[User]] = db.run {
    user.result
  }

  def isAdmin(id: UUID): Future[Boolean] = {
    val roleId = user.filter(_.id === id).map(_.roleId)
    db.run(role.filter(_.id in roleId).filter(_.role === "admin").exists.result) // <- run as one query
  }

  def isUserAdmin(id: UUID): Boolean = {
    val roleId = user.filter(_.id === id).map(_.roleId)
    var isAdmin = db.run(role.filter(_.id in roleId).filter(_.role === "admin").exists.result) // <- run as one query

    Await.result(isAdmin, Duration.Inf)
  }

  def find(id: UUID): Future[Option[User]] = db.run {
    user.filter(_.id === id).result.headOption
  }

  def getByRoleId(category_id: Int): Future[Seq[User]] = db.run {
    user.filter(_.roleId === category_id).result
  }

  def find(loginInfo: LoginInfo): Future[Option[User]] = db.run {
    user.filter(_.providerID === loginInfo.providerID).filter(_.providerKey === loginInfo.providerKey).result.headOption
  }

  def getByRolesId(category_ids: List[Int]): Future[Seq[User]] = db.run {
    user.filter(_.roleId inSet category_ids).result
  }

  def update(updateUser: User): Future[User] = db.run {
    user
      .filter(_.id === updateUser.userID)
      .update(updateUser).map(_ => updateUser)
  }

  class UserTable(tag: Tag) extends Table[User](tag, "users") {
    def id = column[UUID]("id", O.PrimaryKey)
    def email = column[Option[String]]("email")
    def roleId = column[Int]("roleId")
    def providerID = column[String]("providerid")
    def providerKey = column[String]("providerkey")
    def active = column[Boolean]("activated")
    def fname = column[Option[String]]("firstName")
    def lname = column[Option[String]]("lastName")
    def fullName = column[Option[String]]("fullName")
    def avatarURL = column[Option[String]]("avatarurl")
    def fKeyuserRoles_users = foreignKey("fKeyuserRoles_users", roleId, role)(_.id)
    def * = (id, providerID, providerKey, fname, lname, fullName, email, avatarURL, active, roleId) <> ((User.apply _).tupled, User.unapply)
  }
}
