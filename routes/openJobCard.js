const express = require("express");

let router = express.Router();
const JobCard = require("../models/jobCard");
const app = express();
app.set("view engine", "ejs");

app.use(express.json());

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

        const openJobCards = await JobCard.find({
          openJobCard: 1,
          customerName: regex,
        });
        //https://kb.objectrocket.com/mongo-db/or-in-mongoose-1018

        //Check whether Cards array is empty
        if (openJobCards.length < 1) {
          noMatch = true;
        }

        return res.render("openJobCard", {
          input,
          noMatch,
          openJobCards,
        });
      } else {
        //original Code
        let cards = await JobCard.find({ openJobCard: 1 });

        //Only input , noMatch added
        return res.render("openJobCard", {
          openJobCards: cards,
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
router.route("/:cardID").post(async (req, res) => {
  const cardid = { _id: req.params.cardID };
  const update = { openJobCard: 0, completeJobCard: 1 };

  let card = await JobCard.findOneAndUpdate(cardid, update);
  card = await JobCard.findOne(cardid);
  res.redirect("/completeJobCard");
});

module.exports = router;
