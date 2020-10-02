-- ### Schema
DROP DATABASE IF EXISTS budget_app;
CREATE DATABASE budget_app;

USE budget_app;



-- ### USERS table
CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
    
	PRIMARY KEY (id)
) ENGINE=InnoDB;



-- ### INCOME tables 
CREATE TABLE income_categories
(
	id int NOT NULL AUTO_INCREMENT,
  categoryKey VARCHAR (36),
  name varchar(255) NOT NULL,
  
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE income_types
(
  id int NOT NULL AUTO_INCREMENT,
  typeKey VARCHAR (36),
  name varchar(255) NOT NULL,
  description varchar(255) NOT NULL,

  income_category_id int,
  
  PRIMARY KEY (id),
  
  FOREIGN KEY (income_category_id) REFERENCES income_categories(id)
) ENGINE=InnoDB;

CREATE TABLE income_items
(
  id int NOT NULL AUTO_INCREMENT,
  value int,

  user_id int,
  income_type_id int,
  
  INDEX user_index (user_id),
  PRIMARY KEY (id),
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (income_type_id) REFERENCES income_types(id)
) ENGINE=InnoDB;



-- ### EXPENSE tables 
CREATE TABLE expense_categories
(
	id int NOT NULL AUTO_INCREMENT,
  categoryKey VARCHAR (36),
  name varchar(255) NOT NULL,
    
	PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE expense_types
(
  id int NOT NULL AUTO_INCREMENT,
  typeKey VARCHAR (36),
  name varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  
  expense_category_id int,
  
  PRIMARY KEY (id),

  FOREIGN KEY (expense_category_id) REFERENCES expense_categories(id)
) ENGINE=InnoDB;

CREATE TABLE expense_items
(
  id int NOT NULL AUTO_INCREMENT,
  value int DEFAULT 0,
  
  user_id int,
  expense_type_id int,
  
  INDEX user_index (user_id),
  PRIMARY KEY (id),
    
  FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (expense_type_id) REFERENCES expense_types(id)
) ENGINE=InnoDB;



-- ### CUSTOM INCOME table
CREATE TABLE custom_income_items
(
	id int NOT NULL AUTO_INCREMENT,
  type_name varchar(255) NOT NULL,
  type_description varchar(255) NOT NULL,
  value int,
  
  category_id int,
  user_id int,
    
	INDEX user_index (user_id),
  PRIMARY KEY (id),
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES income_categories(id)
) ENGINE=InnoDB;


-- ### CUSTOM EXPENSE table
CREATE TABLE custom_expense_items
(
	id int NOT NULL AUTO_INCREMENT,
  type_name varchar(255) NOT NULL,
  type_description varchar(255) NOT NULL,
  value int,
  
  category_id int,
  user_id int,
    
	INDEX user_index (user_id),
  PRIMARY KEY (id),
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES expense_categories(id)
) ENGINE=InnoDB;
