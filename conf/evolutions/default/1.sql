--- !Ups

create table users (
                       id UUID primary key not null,
                       providerid varchar(255) not null,
                       providerkey varchar(255) not null,
                       firstName varchar(255),
                       lastName varchar(255),
                       fullName varchar(255),
                       email varchar(255),
                       avatarURL varchar(255),
                       activated bool default true,
                       roleId integer not null,
                       FOREIGN KEY (roleId) references userRoles (id)
);
create table userRoles (
                           id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                           role varchar(255) not null
);
create table categories (
                            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                            name varchar(255) not null
);
create table products (
                          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                          name varchar(255) not null,
                          description text,
                          price numeric default 0,
                          image varchar(255),
                          category integer not null,
                          foreign key (category) references categories (id)
);
create table rating (
                        id UUID NOT NULL,
                        userId UUID NOT NULL,
                        productId INTEGER NOT NULL,
                        value INTEGER DEFAULT 0,
                        FOREIGN KEY (userId) references userId (id),
                        FOREIGN KEY (productId) references products (id)
);
create table orderSales (
                            id UUID primary key not null,
                            order_date date not null,
                            total numeric not null,
                            userId UUID not null,
                            orderStatusId integer not null,
                            salesAddressId string not null,
                            foreign key (orderStatusId) references orderStatus (id),
                            foreign key (userId) references users (id),
                            foreign key (salesAddressId) references orderAddress (id)
);
create table orderAddress (
                              id UUID NOT NULL, street String NOT NULL,
                              city String NOT NULL, postalCode String NOT NULL,
                              country String NOT NULL
);
create table orderStatus (
                             id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                             name String NOT NULL
);
create table orderProducts (
                               id UUID primary key not null,
                               orderId UUID,
                               name varchar(255) not null,
                               price numeric not null,
                               foreign key (orderId) references orderSales (id)
);
create table comments (
                          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                          userName String not null,
                          userAvatar String not null,
                          productId INTEGER not null,
                          createdDate date,
                          text varchar(255),
                          FOREIGN KEY (productId) references products (id)
);
INSERT INTO userRoles(id, role)
VALUES
(1, 'admin'),
  (2, 'user');
INSERT INTO categories(id, name)
VALUES
(1, 'headphones'),
  (2, 'earphones');
INSERT INTO orderStatus(id, name)
VALUES
(1, 'bought'),
  (2, 'payed'),
  (3, 'shipped'),
  (4, 'finished');
INSERT INTO products(
    id, name, description, price, image,
    category
)
VALUES
(
    1, 'Beats by Dr Dre', 'eats Electronics LLC is a subsidiary of Apple Inc. that produces audio products. Headquartered in Culver City, California, the company was founded by music producer and rapper Dr. Dre and Interscope Records co-founder Jimmy Iovine. The subsidiary''s product line is primarily focused on headphones and speakers.',
    300, '/img/1.webp', 1
),
  (
    2, 'Sony', 'Sony Corporation is a Japanese multinational conglomerate corporation headquartered in Kōnan, Minato, Tokyo. Its diversified business includes consumer and professional electronics, gaming, entertainment and financial services',
    250, '/img/4.webp', 2
  ),
  (
    3, 'Marshell', 'Marshall Amplification is a British company that designs and manufactures music amplifiers, speaker cabinets, brands personal headphones and earphones, and, having acquired Natal Drums, drums and bongos.',
    120, '/img/2.webp', 1
  ),
  (
    4, 'Apple', 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Five technology companies, alongside Microsoft, Amazon, Google, and Facebook',
    300, '/img/3.webp', 2
  );


--- !Downs

drop     table users;
drop    table userRoles;
drop    table categories;
drop    table orderStatus;
drop    table products;
drop    table orderSales;
drop    table orderProducts;
drop    table comments;
drop    table rating;
drop    table orderAddress;
