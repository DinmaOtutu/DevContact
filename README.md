# DevContact


[![Build Status](https://travis-ci.org/DinmaOtutu/DevContact.svg?branch=develop)](https://travis-ci.org/DinmaOtutu/DevContact)
[![Coverage Status](https://coveralls.io/repos/github/DinmaOtutu/DevContact/badge.svg?branch=develop)](https://coveralls.io/github/DinmaOtutu/DevContact?branch=develop)

## Vision
Allow CRUD operation for developers where they can create, view, update and delete their contacts.

---
## Installation
1. Ensure [**Node JS**](https://nodejs.org/en/) is installed.
2. Ensure [**Postgres**](https://www.postgresql.org/) is installed.
3. Clone the [**repository here**](https://github.com/DinmaOtutu/devContact.git)
4. Navigate to the project directory `cd  devContact`
5. Run `npm install` on the terminal to install dependecies
6. Create a .env file in your root directory and copy content from `.env.sample` file to `.env` file and set environment variables with the appropriate values.
7. Create Postgresql database and run migrations: `npm run migrations`
8. Also can choose to use the online database get the URL and add to the .env file


##
API Endpoint: https://localhost:3000/api

# Technologies Used
- Backend: Node/Express
- Postgres, Sequelize ORM
- Libraries: babel-cli, Es6, mocha, chai

# Features
- A user can be created by providing these details
{
    "fullname": "fullname",
    "username": "username",
    "category": "category",
    "email": "email",
    "password": "password",
    "confirmPassword": "password"
    }

- all developer details can be gotten.
- A single developer detail can be gotten using an id
- A developers details can be gotten category frontend developer, backend developer, UI/UX designer, others
- A user can delete there details.
- A user can update their contact details.

## API Endpoints

| Endpoint                                         | Functionality                      |
| ------------------------------------------------ | ---------------------------------- |
| POST /api/users                                  | Create a user                      |
| GET  /api/users                                  | Get all users                      |
| GET /api/users/\<userId>                         | get a single user                  |
| PUT /api/users/\<userId>                         | Update an existing user with userId|
| DELETE /api/users/\<userId>                      | delete an existing user with userId|

## AUTHOR
[Yours truly, Otutu Chidinma](https://github.com/DinmaOtutu/devContact)