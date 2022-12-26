// import { Schema, model } from 'mongoose'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
