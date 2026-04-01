DROP DATABASE IF EXISTS taskdb;
CREATE DATABASE taskdb;
USE taskdb;

DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    deadline DATE,
    responsible VARCHAR(255),
    status VARCHAR(50),
    note TEXT
);