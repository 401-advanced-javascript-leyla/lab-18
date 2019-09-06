# LAB - 18

## ACL

### Author: Leyi Li


### Links and Resources
* [submission PR](https://github.com/401-advanced-javascript-leyla/lab-18/pulls)
* [travis](https://travis-ci.com/401-advanced-javascript-leyla/lab-18)
* [heroku](https://lab-18-leyla.herokuapp.com/)

#### Documentation
* [jsdoc](http://localhost:3000/docs/) 
* [swagger](http://localhost:3333/api-docs)

### Modules
#### `users-model.js`
##### Exported User Schema and methods (createFromOauth(), authenticateBasic(), comparePassword(), generateToken())

### Setup
#### `.env` requirements
* `PORT` - 3000
* `SWAGGER` - 3333

#### Running the app
* `npm install`
* `npm start`
* Endpoint: `/signup`
  * Creates a new user and saves it to database
* Endpoint: `/signin`
  * Validates the user and append cookie to response.
  * Endpoint: `/oauth`
  * sends token to response
  
#### Tests
* `npm run test`


