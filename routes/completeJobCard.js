const express = require("express");

let router = express.Router();
const JobCard = require("../models/jobCard");
const JobBill = require("../models/jobBill");
const TotalRevenue = require("../models/totalRevenue");
const { findOne } = require("../models/jobCard");
const app = express();
app.set('view engine', 'ejs');

app.use(express.json());


let utc = new Date();
utc.setHours( utc.getHours() + 5);
utc.setMinutes( utc.getMinutes() + 30);
//domain.updated = utc;



router
   .route("/")
   .get(async (req,res)=>{




      //test
      const bill = new JobBill({
         customerName:"Piyush", 
         billDate:utc
      });

      console.log(bill.billDate.getDate());
      // bill.save();



      
      let cards = await JobCard.find({completeJobCard : 1});
      
      
      res.render("completeJobCard", {completeJobCards : cards});
   })
   .post((req,res)=>{
      res.redirect("/");
   });
router
   .route("/:cardID")
   .get(async (req,res)=>{
      const cardid = {_id: req.params.cardID};
      let card =await JobCard.findOne({cardid , completeJobCard : 1});
      res.render("makeBill", {card : card});

   })
   .post(async (req,res)=>{
      let currOil = parseInt(req.body.oilPrice);
      
      let currLub = req.body.lubPrice;
      let currLabour = req.body.labourPrice;
      let currPart = req.body.partPrice;
      TotalRevenue.findOne({name:'Oil'} , function(err , curr){
         curr.total = curr.total + currOil;
         curr.save(); 
      });

     



      const cardid = {_id: req.params.cardID};
      const update = {completeJobCard : 0 , closeJobCard:1};
      let card = await JobCard.findOneAndUpdate(cardid , update);
      const bill = new JobBill({
         vehicleNumber:card.carNumber,
         customerName:card.customerName,
         vehicleModel:card.vehicleModel,
         contactNumber:card.contactNumber,
         oilDesc:req.body.oilDesc,
        oilCharges:req.body.oilPrice,
        labourDesc:req.body.labourDesc,
        labourCharges:req.body.labourPrice,
        sparePartDesc:req.body.partDesc,
        sparePartCharges:req.body.partPrice,
        lubDesc:req.body.lubDesc,
        lubCharges:req.body.lubPrice
     });

     bill.save();
    
      
      res.redirect("/closeJobCard");
   })

module.exports = router;