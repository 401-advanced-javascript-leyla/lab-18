'use strict';

const express = require('express');
const apiRouter = express.Router();

const User = require('../model/user.js');
const Article = require('../model/article.js');
const auth = require('../middleware/auth.js');
const oauth = require('../oauth/google.js');


/**
 * This function let user signup
 * @route POST /signup
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} user information
 * @returns {Error}  default - Unexpected error
 */
apiRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then((user) => {
      req.token = user.generateToken(user.role);
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    })
    .catch(next);
});

/**
 * This function let user signin
 * @route POST /signin
 * @param {object} auth
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} user token
 * @returns {Error}  default - Unexpected error
 */

apiRouter.post('/signin', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

/**
 * This function get oauth
 * @route GET /oauth
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} user token
 * @returns {Error}  default - Unexpected error
 */

apiRouter.get('/oauth', (req, res, next) => {
  oauth.authorize(req)
    .then(token => {
      res.status(200).send(token);
    })
    .catch(next);
});


/**
 * This function let user signup
 * @route POST /key
 * @param {object} auth
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} user key
 */

// generates a key for indefinite use.
apiRouter.post('/key', auth(), (req, res, next) => {
  let key = req.user.generateKey();
  res.status(200).send(key);
});

/**
 * This function let user signup
 * @route POST /article
 * @param {object} auth
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} article
 */

apiRouter.post('/article', auth('create'), (req, res, next) => {
  let article = new Article(req.body);
  article.save()
    .then(article => {
      res.status(200);
      res.send(article);
    })
    .catch(next);
});

//

module.exports = apiRouter;
