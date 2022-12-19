const express = require("express");

let router = express.Router();
const JobCard = require("../models/jobCard");
const app = express();
app.set("view engine", "ejs");

router
  .route("/")
  .get((req, res) => {
    res.render("addjobcard");
  })
  .post((req, res) => {
    //Save data to MongoDB
    const job = new JobCard({
      vehicleNumber: req.body.carNumber,
      customerName: req.body.customerName,
      vehicleModel: req.body.car,
      contactNumber: req.body.contactNumber,
      openJobCard: 1,
      completeJobCard: 0,
      closeJobCard: 0,
    });

    job.save(function () {});

    res.redirect("/");
  });

module.exports = router;
