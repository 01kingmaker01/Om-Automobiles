const express = require("express");
const mongoose = require("mongoose");

const jobBillSchema = new mongoose.Schema({
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
  oilDesc: {
    type: String,
  },
  oilCharges: {
    type: Number,
  },
  labourDesc: {
    type: String,
  },
  labourCharges: {
    type: Number,
  },
  sparePartDesc: {
    type: String,
  },
  sparePartCharges: {
    type: Number,
  },
  lubDesc: {
    type: String,
  },
  lubCharges: {
    type: Number,
  },

  billDate: {
    type: Date,
  },
});
module.exports = mongoose.model("JobBill", jobBillSchema);
