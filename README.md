# API Suite Example with Swagger and Express

This example is a guide for implementing an API suite with NodeJS, Express, Swagger and MongoDB

For more information please check the documentation on:

 1. [Express](https://www.npmjs.com/package/express)
 2. [Swagger Express](https://www.npmjs.com/package/swagger-express-middleware)
 3. [Swagger UI](https://www.npmjs.com/package/swagger-ui)
 4. [Mongoose](https://www.npmjs.com/package/mongoose)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Download a GIT client as [TortoiseGIT](https://tortoisegit.org/)
2. Clone the repository from [SSH](git@gitlab.com:jasabino/APISuiteSample.git) or [HTTPS](https://gitlab.com/jasabino/APISuiteSample.git)
3. click on Install.bat or Install.sh for installing the DataBase

### Prerequisites

You need these programs in order to running this project:

1. Node.js [(Download)](https://nodejs.org/en/)
2. Mongo DB [(Download)](https://www.mongodb.com/download-center#community)
3. RoboMongo 1.0 [(Download)](https://robomongo.org/download)

### Installing on CentOS

1. Install Node.js and npm

```
Installation guide (How To Install Node.js From The EPEL Repository): https://www.unixmen.com/install-node-js-centos-7/

sudo yum install epel-release
sudo yum install nodejs
sudo yum install npm
```

3. Install MongoDB

```
Installation guide: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-centos-7

sudo yum install mongodb-org
sudo systemctl start mongod
```

4. Download project

```
guide: https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-clone?utm_source=stash&utm_medium=in-app-help&utm_campaign=learn-git-clone

git clone git@gitlab.com:jasabino/APISuiteSample.git
```

## Starting up the Server

For starting up the server, please execute this command on the root path of the project (where the file app.js is located)

```
swagger project start
```

Now, you will see a message like 

```
project started here: http://localhost:10010/
```

Indicating that the server is running on port 10010 and the url base for all web services is `http://localhost:10010/`

## Checking the API Docs

An API doc page will be deployed on: 

```
http://localhost:10010/api-docs
```

with all information of each web services, so you can see:

1. Method
2. Path
3. Parameters
4. Possible Responses

And you could test each api, doing click on the `try it out` button


## Explaining the example

this example is a library model where a user has many books of different genres in different states (readed, reading, etc)

For seeing all posible genres, please use:

> GET http://localhost:10010/genres

For seeing all posible states, please use:

> GET http://localhost:10010/states

For get a list of books per user, please use:

> GET http://localhost:10010/books

Also you can get, add, edit or delete a book of the library for a specific user with:

> http://localhost:10010/book
> Using the respective method POST (for adding), PUT (for editing), DELETE (for deleting), GET (for getting) 

### Responses

For 200 response you will get an structure like that:
```
{
  "success": true,
  "response": {},
  "errors": [
    {
      "code": "string",
      "message": "string"
    }
  ]
}
```

Where success indicates if the response is valid or not, if this variable is false, you will get errors, such as:

* 1001 Book not found
* 1002 Incomplete or worng values for adding the book to the library
* 1003 Error adding the book to the library
* 1004 Error updating the book in the library
* 1005 The book doesn't exists or it doesn't belong to this user
* 1006 Error deleting the book of the library, check that the id of the book exists and it belongs to this user

**Note:** Each endpoint receive a token as parameter, if the token is invalid or it doesn't exist in the collection tokens in the database, the user gets an `401 	Unauthorized` response 

With the original data of test you could use this token `7ytr457dfer46=br3Poi009` belongs to the user 1

>Please keep in mind that in this Sample is not implemented a complete token authentication or validation, is only a sample of how the api suite should manage it, in a complete example of token authentication it should have an expiration date and should be generated with a tool for managing of token as npm-token

## Project Structure

In the root folder you could find the app.js file that is the principal fil of configuration of this project if you want to change the port of the server please change the variable `port` on this file

#### api folder

It contains the source, controllers, generic functions and models files

**NOTE:** In swagger folder, you will find a file  `swagger.yaml` that contains the rules for each api in the system

#### config folder

It contains two files:

1. db.js contains the settings for connecting to the data base, if you are using another configuration for your database please change the following variables in this file:
```
var server = 'localhost';
var port = '27017';
var db = 'LibrarySampleDB';
```
2. default.yaml contains the default configuration for swagger

#### db folder

It contains the files for restoring the database on Mongo. these files are a dump backup created with the follow sentences:
```
mongodump  --db LibrarySampleDB --out C:\Users\%USERNAME%\Documents\dump
```

#### node_modules folder

It contains the depedencies and required libraries of Node JS


## Built With

* [Node.js](https://nodejs.org/en) - The runtime environment
* [Express](https://www.npmjs.com/package/express) - Web application framework for Node.js
* [Swagger Express](https://www.npmjs.com/package/swagger-express-middleware) - For API documentation
* [Swagger UI](https://www.npmjs.com/package/swagger-ui) -  For visuallizing render documentation for the API 
* [Mongoose](https://www.npmjs.com/package/mongoose) - For connecting to a Mongo Data Base

