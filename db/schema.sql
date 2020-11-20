### Schema

CREATE DATABASE goty_db;
USE goty_db;

CREATE TABLE games
(
	id int NOT NULL AUTO_INCREMENT,
	gameName varchar(255) NOT NULL,
	votes int,
	PRIMARY KEY (id)
);

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	userHash int,
	userVotes int,
	PRIMARY KEY (id)
);