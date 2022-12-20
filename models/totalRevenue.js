const express = require("express");
const mongoose = require("mongoose");

const totalRevenue = new mongoose.Schema({
  name: {
    type: String,
  },
  total: {
    type: Number,
  },
});
module.exports = mongoose.model("TotalRevenue", totalRevenue);
