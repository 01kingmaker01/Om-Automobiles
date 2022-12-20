const { urlencoded } = require("express");
const express = require("express");
const JobCard = require("./models/jobCard");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mongoose
const uri =
  "mongodb+srv://piyush:piyush@cluster0.so4bq.mongodb.net/garageDB?retryWrites=true&w=majority";
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log(error);
  }
}
connect();

//Home route
const home = require("./routes/home");
app.use("/", home);

//Add Job Card Route
const addJobCard = require("./routes/addJobCard");
app.use("/addJobCard", addJobCard);

//Open Job Card
const openJobCard = require("./routes/openJobCard");
app.use("/openJobCard", openJobCard);

// Complete Job Card
const completeJobCard = require("./routes/completeJobCard");
app.use("/completeJobCard", completeJobCard);

//close Job Card

const closeJobCard = require("./routes/closeJobCard");
app.use("/closeJobCard", closeJobCard);

//search

app.post("/getCards", async function (req, res) {
  let payload = req.body.payload.trim();
  let search = await JobCard.find({
    vehicleNumber: { $regex: RegExp("^" + payload + ".*", "i") },
  });

  search = search.slice(0, 10);
  res.send(JSON.stringify({ payload: search }));
});

//Port
const PORT = 3000;

//test

//ejs
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.send("Hello world");
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      `Server is Successfully Running \nApp is listening on http://localhost:${PORT}`
    );
  else console.log("Error occurred, server can't start", error);
});
