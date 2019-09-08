'use strict';

/**
 * Auth Routes Module
 * @module routes/authRoutes
 */

const User = require('../model/user.js');

module.exports = capability => {
  return (req, res, next) => {
    try {
      let [authType, authString] = req.headers.authorization.split(/\s+/);

      switch (authType.toLowerCase()) {
      case 'basic':
        return _authBasic(authString);
      case 'bearer':
        return _authBearer(authString);
      default:
        return _authError();
      }
    } catch (e) {
      _authError();
    }



    /**
     *This function check the auth string from the request body, authenticate user and then return user and token
     *
     * @param {string} authString
     * @returns {object} user information (token)
     */
    function _authBasic(authString) {
      let base64Buffer = Buffer.from(authString, 'base64');
      let bufferString = base64Buffer.toString();
      let [username, password] = bufferString.split(':');
      let auth = { username, password };

      return User.authenticateBasic(auth)
        .then(user => _authenticate(user))
        .catch(_authError);
    }

    /**
     *This function authenticate bearer
     *
     * @param {string} authString
     * @returns user information
     */

    function _authBearer(authString) {
      return User.authenticateToken(authString)
        .then(user => _authenticate(user))
        .catch(_authError);
    }

    /**
     *This function authenticate user information
     *
     * @param {object} user
     * @returns user information (token)
     */

    function _authenticate(user) {
      if (user && (!capability || user.can(capability))) {
        req.user = user;
        req.token = user.generateToken(user.role);
        next();
      }
      else {
        _authError();
      }
    }

    function _authError() {
      next('Invalid User ID / Password');
    }
  };
};