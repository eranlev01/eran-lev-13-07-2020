CREATE DATABASE TodoList;

USE TodoList;

CREATE TABLE users(
    id INT AUTO_INCREMENT,
    isAdmin BOOLEAN DEFAULT FALSE,
    u_name VARCHAR(255) NOT NULL,
    password TEXT(255) NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE todos(
	id INT AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL,
    isCompleted BOOLEAN,
    PRIMARY KEY(id)
);

INSERT INTO users(isAdmin, u_name, password)
VALUES(true, 'eranlev1010@gmail.com', 'eran1234'),
VALUES(false, 'snirisrael2020@gmail.com', 'snir12');

INSERT INTO todos(description, isCompleted)
VALUES('Clean my room', false),
VALUES('walk with my dog', true);
VALUES('Produce new music', false);