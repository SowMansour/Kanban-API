# Quizz Project

## What is the goal of the Kanban-API project :thinking:

The Kanban-API project aims to create a Kanban-style application where users can create cards within lists (CRUD)

- Users can create as many lists as they desire and place as many cards inside these lists.
- Each list has a name.
- Each card has a title, a position within the list, an optional color, and one or more optional labels.

I am using this requirement as the basis for creating the Entity-Relationship Diagram (ERD) of the application.

### Review stack used :
 - Express
 - Dotenv
 - PostgeSQL
 - Sequelize
 - cors
 - Multer

### Database set up step by step :

1 - Connexion to the database --> psql postgres

2 - Create user --> CREATE ROLE username WITH LOGIN PASSWORD 'username';

3 - Create the database --> CREATE DATABASE DBname OWNER DBname;

4 - Insert the data/tables --> psql -U username -d DBname -f /path/to/data.sql