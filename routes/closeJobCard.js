const express = require("express");

let router = express.Router();
const JobCard = require("../models/jobCard");
const JobBill = require("../models/jobBill");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());

//test

let path = require("path");
let filePath = "./views/closeJobCard.html";
let resolvedPath = path.resolve(filePath);

router
  .route("/")
  .get(async (req, res) => {
    //console.log(__dirname+'/views/closeJobCard.html');
    let cards = await JobCard.find({ closeJobCard: 1 });
    console.log(cards);
    res.render("closeJobCard", { closeJobCard: cards });
  })
  .post((req, res) => {
    res.redirect("/");
  });
router.route("/getCards").post(async (req, res) => {});

module.exports = router;
