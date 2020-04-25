
# --- !Ups


CREATE TABLE "user" (
 "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
 "firstName" VARCHAR NOT NULL,
 "lastName" VARCHAR NOT NULL,
 "email" VARCHAR NOT NULL,
 "address" TEXT NOT NULL
);

# --- !Downs
--
-- DROP TABLE "user"
