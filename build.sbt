import sbt._
import play.sbt.{ PlayLayoutPlugin, PlayScala}

name := "scala1"
 
version := "1.0"

lazy val `scala1` = (project in file(".")).enablePlugins(PlayScala)

resolvers := ("Atlassian Releases" at "https://maven.atlassian.com/public/") +: resolvers.value
resolvers += Resolver.sonatypeRepo("snapshots")

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
resolvers += Resolver.jcenterRepo
resolvers += "Akka Snapshot Repository" at "https://repo.akka.io/snapshots/Users/dsopata/_projects/studies/scala1/app/controllers/UserController.scala:10/"
resolvers += "Sonatype snapshots" at "https://oss.sonatype.org/content/repositories/snapshots/"

scalaVersion := "2.12.2"

libraryDependencies ++= Seq(
  ehcache,
  ws ,
  specs2 % Test ,
  guice,
  filters,
  evolutions,
  "com.typesafe.play" %% "play-slick" % "4.0.0",
  "com.typesafe.play" %% "play-slick-evolutions" % "4.0.0",
  "org.xerial"        %  "sqlite-jdbc" % "3.30.1",
  "com.mohiva"        %% "play-silhouette" % "5.0.0-RC2",
  "com.mohiva"        %% "play-silhouette-password-bcrypt" % "5.0.0-RC2",
  "com.mohiva"        %% "play-silhouette-persistence" % "5.0.0-RC2",
  "com.mohiva"        %% "play-silhouette-crypto-jca" % "5.0.0-RC2",
  "org.webjars"       %% "webjars-play" % "2.7.0",
  "net.codingwell"    %% "scala-guice" % "4.1.0",
  "com.iheart"        %% "ficus" % "1.4.3",
  "com.typesafe.play" %% "play-mailer" % "7.0.0",
  "com.typesafe.play" %% "play-mailer-guice" % "7.0.0",
  "com.enragedginger" %% "akka-quartz-scheduler" % "1.6.1-akka-2.5.x"
)

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )

      