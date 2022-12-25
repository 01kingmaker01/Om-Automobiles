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
    try {
      //For Search Bar

      let input;
      let noMatch = false;

      //regrex fuction for Fuzzy Logic
      //Link => https://stackoverflow.com/questions/38421664/fuzzy-searching-with-mongodb

      function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      }

      console.log(req.query.search);

      if (req.query.search) {
        input = req.query.search;
        const regex = new RegExp(escapeRegex(input), "gi");

        const closeJobCards = await JobCard.find({
          closeJobCard: 1,
          customerName: regex,
        });
        //https://kb.objectrocket.com/mongo-db/or-in-mongoose-1018

        //Check whether Cards array is empty
        if (closeJobCards.length < 1) {
          noMatch = true;
        }

        return res.render("closeJobCard", {
          input,
          noMatch,
          closeJobCards,
        });
      } else {
        //original Code
        let cards = await JobCard.find({ closeJobCard: 1 });

        //Only input , noMatch added
        return res.render("closeJobCard", {
          closeJobCards: cards,
          input,
          noMatch,
        });
      }
    } catch (error) {
      console.error(error);
    }
  })

  .post((req, res) => {
    res.redirect("/");
  });
router.route("/getCards").post(async (req, res) => {});

module.exports = router;
