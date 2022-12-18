const express = require("express");

let router = express.Router();
const JobCard = require("../models/jobCard");
const app = express();
app.set('view engine', 'ejs');

app.use(express.json());

router
   .route("/")
   .get(async (req,res)=>{
      
      let cards = await JobCard.find({openJobCard : 1});
      
      
      res.render("openJobCard", {openJobCards : cards});
   })
   .post((req,res)=>{
      res.redirect("/");
   });
router
   .route("/:cardID")
   .post(async (req,res)=>{
      const cardid = {_id: req.params.cardID};
      const update = {openJobCard :0 , completeJobCard:1};

      let card = await JobCard.findOneAndUpdate(cardid , update);
      card = await JobCard.findOne(cardid);
      res.redirect("/completeJobCard");
   })

module.exports = router;