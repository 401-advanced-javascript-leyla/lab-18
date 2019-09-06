'use strict';

const express = require('express');
const router = express.Router();

// const User = require('./model/user.js');
const auth = require('./middleware/auth.js');

router.get('/public-stuff', (req, res, next) => {
  console.log('got in public-stuff');
  return true;
});

router.get('/hidden-stuff', auth(), (req, res, next) => {
  console.log('got in hidden-stuff');
  return true;
});

router.get('/something-to-read', auth('read'), (req, res, next) => {
  console.log('got in something-to-read');
  return true;
});

router.post('/create-a-thing', auth('create'), (req, res, next) => {
  console.log('got in creat-a-thing');
  return true;
});

router.put('/update', auth('update'), (req, res, next) => {
  console.log('got in update');
  return true;
});

router.patch('/jp', auth(), (req, res, next) => {
  console.log('got in public-stuff');
  return true;
});

router.delete('/bye-bye', auth('delete'), (req, res, next) => {
  console.log('got in public-stuff');
  return true;
});

router.get('/everything', auth('superuser'), (req, res, next) => {
  console.log('got in public-stuff');
  return true;
});


  