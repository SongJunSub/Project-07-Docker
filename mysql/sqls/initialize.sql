DROP DATABASE IF EXISTS MYAPP;

CREATE DATABASE MYAPP;
USE MYAPP;

CREATE TABLE LISTS (
    ID INTEGER AUTO_INCREMENT,
    VALUE TEXT,
    PRIMARY KEY (ID)
);