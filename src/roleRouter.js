'use strict';

const express = require('express');
const apiRouter = express.Router();

const Role = require('./model/role.js');


apiRouter.post('/createRole', (req, res, next) => {
  let role = new Role(req.body);
  role.save()
    .then((role) => {
      req.role = role.role;
      req.capabilities = role.capabilities;
      res.send(req.body);
    })
    .catch(next);
});