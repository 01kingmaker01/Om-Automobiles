const express = require("express");
const mongoose = require("mongoose");

const jobCardScehma = new mongoose.Schema({
  vehicleNumber: {
    type: String,
  },
  customerName: {
    type: String,
  },
  vehicleModel: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  openJobCard: {
    type: Number,
  },
  completeJobCard: {
    type: Number,
  },
  closeJobCard: {
    type: Number,
  },
  // kM:{
  //     type:Number
  // }
});
module.exports = mongoose.model("JobCard", jobCardScehma);
