const express = require("express");
let router = express.Router();
const JobCard = require("../models/jobCard");

const app = express();
app.set('view engine', 'ejs');

// const job = new JobCard({
//     vehicleNumber:"MH124967",
//     customerName:"Piyu",
//     vehicleModel:"Suzuki",
//     kM:"12000"
// });
// job.save(function(){
//    console.log("Saved");
// });

router
   .route("/")
   .get(async (req,res)=>{
      
   let totalJobCards = await JobCard.count({});
   let totalOpenJobCards = await JobCard.count({openJobCard:1});
   let totalCompleteJobCards = await JobCard.count({completeJobCard:1});
   let totalCloseJobCards = await JobCard.count({closeJobCard:1});
   
     
     res.render("Home" ,
      {
        totalJobCards : totalJobCards,
        totalOpenJobCards:totalOpenJobCards,
        totalCompleteJobCards:totalCompleteJobCards,
        totalCloseJobCards:totalCloseJobCards
      });
   })
   .post((req,res)=>{

   });

module.exports = router;