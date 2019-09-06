'use strict';

const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  role: { type: String, required: true },
  capabilities: { type: Array, required: true },
});

// roleSchema.virtual('')

module.exports = mongoose.model('roles', roleSchema);