## example-nestjs-auth

A complete, working example of NestJS authentication

## Getting started

### Install node

https://nodejs.org/en/download/

### Install nest CLI

        npm install -g @nestjs/cli

### Install MySQL

https://dev.mysql.com/downloads/mysql/

Add MySQL bin directory to path.

This application is tested with MySQL 5.7 and 8.0. **Note: Use legacy authentication mechanism for MySQL 8.0**

### Create database

Create MySQL database

        $ mysql -uroot -p
        mysql> create database `example_nestjs_auth`;

### Set up local environment

Create file in project root called `.db.env` and set environment variables for DB, e.g.:

        TYPEORM_USERNAME=root
        TYPEORM_PASSWORD=<db_password>
        TYPEORM_HOST=localhost

Create file in project root called `.jwt.env` and set environment variables for JWT, e.g.:

        JWT_ACCESS_TOKEN_SECRET=super_secret_access_key
        JWT_REFRESH_TOKEN_SECRET=super_secret_refresh_key