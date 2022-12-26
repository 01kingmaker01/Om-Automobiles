const express = require("express");

let router = express.Router();
const JobCard = require("../models/jobCard");
const JobBill = require("../models/jobBill");
const TotalRevenue = require("../models/totalRevenue");
const { findOne } = require("../models/jobCard");
const { authenticateJWT } = require("../middleware");
const app = express();
app.set("view engine", "ejs");

app.use(express.json());

let utc = new Date();
utc.setHours(utc.getHours() + 5);
utc.setMinutes(utc.getMinutes() + 30);
//domain.updated = utc;

router
  .route("/")
  .get(authenticateJWT, async (req, res) => {
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

        const completeJobCards = await JobCard.find({
          completeJobCard: 1,
          customerName: regex,
        });
        //https://kb.objectrocket.com/mongo-db/or-in-mongoose-1018

        //Check whether Cards array is empty
        if (completeJobCards.length < 1) {
          noMatch = true;
        }

        return res.render("completeJobCard", {
          input,
          noMatch,
          completeJobCards,
        });
      } else {
        //original Code
        let cards = await JobCard.find({ completeJobCard: 1 });

        //Only input , noMatch added
        return res.render("completeJobCard", {
          completeJobCards: cards,
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
router
  .route("/:cardID")
  .get(async (req, res) => {
    const cardid = { _id: req.params.cardID };
    let card = await JobCard.findOne({ cardid, completeJobCard: 1 });
    res.render("makeBill", { card: card });
  })
  .post(async (req, res) => {
    let currOil = parseInt(req.body.oilPrice);

    let currLub = req.body.lubPrice;
    let currLabour = req.body.labourPrice;
    let currPart = req.body.partPrice;
    TotalRevenue.findOne({ name: "Oil" }, function (err, curr) {
      curr.total = curr.total + currOil;
      curr.save();
    });

    const cardid = { _id: req.params.cardID };
    const update = { completeJobCard: 0, closeJobCard: 1 };
    let card = await JobCard.findOneAndUpdate(cardid, update);
    const bill = new JobBill({
      vehicleNumber: card.carNumber,
      customerName: card.customerName,
      vehicleModel: card.vehicleModel,
      contactNumber: card.contactNumber,
      oilDesc: req.body.oilDesc,
      oilCharges: req.body.oilPrice,
      labourDesc: req.body.labourDesc,
      labourCharges: req.body.labourPrice,
      sparePartDesc: req.body.partDesc,
      sparePartCharges: req.body.partPrice,
      lubDesc: req.body.lubDesc,
      lubCharges: req.body.lubPrice,
    });

    bill.save();

    res.redirect("/closeJobCard");
  });

module.exports = router;
