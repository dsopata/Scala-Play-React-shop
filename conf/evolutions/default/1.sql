
 --- !Ups

CREATE TABLE "category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" VARCHAR NOT NULL
);

CREATE TABLE "warehouse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" VARCHAR NOT NULL
);

CREATE TABLE "product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "category" INT NOT NULL,
    "warehouse" int NOT NULL,
    "price" VARCHAR NOT NULL,
    FOREIGN KEY(category) references category(id),
    FOREIGN KEY(warehouse) references warehouse(id)
);

CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "address" TEXT NOT NULL
);

CREATE TABLE "cartItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    FOREIGN KEY(itemId) references product(id),
    FOREIGN KEY(userId) references user(id)
);

CREATE TABLE "delivery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,
    "price"  VARCHAR,
    FOREIGN KEY(userId) references user(id)
);

CREATE TABLE "comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "text"  TEXT,
    "createdDate" DATE,
    FOREIGN KEY(userId) references user(id)
);

 --- !Downs
--
-- DROP TABLE "category"
-- DROP TABLE "warehouse"
-- DROP TABLE "product"
-- DROP TABLE "user"
-- DROP TABLE "cartItem"
-- DROP TABLE "delivery"
-- DROP TABLE "comment"
