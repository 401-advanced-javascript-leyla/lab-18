'use strict';

const express = require('express');
const router = express.Router();

// const User = require('./model/user.js');
const auth = require('../middleware/auth.js');

/**
 * This shows users the public contents
 * @route GET /public-stuff
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

router.get('/public-stuff', (req, res, next) => {
  console.log('got in public-stuff');
  return true;
});

/**
 * This shows users with the access the hidden contents
 * @route GET /hidden-stuff
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

router.get('/hidden-stuff', auth(), (req, res, next) => {
  console.log('got in hidden-stuff');
  return true;
});

/**
 * This shows users with reading capability the public contents
 * @route GET /something-to-read
 * @param {object} auth
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

router.get('/something-to-read', auth('read'), (req, res, next) => {
  console.log('got in something-to-read');
  return true;
});

/**
 * This lets users with creating capability create contents
 * @route POST /create-a-thing
 * @param {object} auth
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

router.post('/create-a-thing', auth('create'), (req, res, next) => {
  console.log('got in creat-a-thing');
  return true;
});

/**
 * This lets users with updating capability to update content
 * @route PUT /update
 * @param {object} auth
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

router.put('/update', auth('update'), (req, res, next) => {
  console.log('got in update');
  return true;
});

/**
 * This lets users signed in capability get the content
 * @route PATCH /jp
 * @param {object} auth
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

router.patch('/jp', auth(), (req, res, next) => {
  console.log('got in public-stuff');
  return true;
});

/**
 * This lets users with deleting capability to delete content
 * @route DELETE /bye-bye
 * @param {object} auth
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

router.delete('/bye-bye', auth('delete'), (req, res, next) => {
  console.log('got in public-stuff');
  return true;
});

/**
 * This lets users with superuser capability to do everything
 * @route GET /everything
 * @param {object} auth
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */

router.get('/everything', auth('superuser'), (req, res, next) => {
  console.log('got in public-stuff');
  return true;
});


  