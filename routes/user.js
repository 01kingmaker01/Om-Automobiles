const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let router = express.Router();

const User = require("../models/user");

const jwtSceret = "SECRET";

//Create route for Creating User
router.post("/signup", async (req, res) => {
  try {
    //gets username & password
    var { username, password } = req.body;
    console.log(username, password);

    //Hashing the password.
    const bycrptedPassword = await bcrypt.hash(password, 10);

    // const allUser = await User.find({});
    // const allUser = await User.deleteMany({});
    // console.log({ allUser });

    // If user existed
    const isUserUserName = await User.find({
      username,
    });

    if (isUserUserName.length > 0) {
      throw new Error("User Email exits!");
    }

    //Creating a new user.
    const user = await User.create({ password: bycrptedPassword, username });

    console.log({ user });

    //creating the jwt token and storing it in cookies.
    const token = jwt.sign({ userId: user._id }, jwtSceret, {
      expiresIn: "1d",
    });

    res
      .cookie("token", `Bearer ${token}`, { maxAge: 24 * 60 * 60 * 1000 })
      .send("User Created Successfully");
  } catch (error) {
    console.error(error);
  }
});

//login template & logic
router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {
    try {
      var { username, password } = req.body;

      //Checking If user exists
      const isUser = await User.find({
        username,
      });

      if (isUser.length == 0) {
        throw new Error("No User Found!");
      }

      //bcrypt the password.
      const validPassword = await bcrypt.compare(password, isUser[0].password);

      if (!validPassword) {
        throw Error("Password is incorrect!");
      }

      // creating the jwt token and storing it in cookies.

      const token = jwt.sign({ userId: isUser[0]._id.toString() }, jwtSceret, {
        expiresIn: "1d",
      });

      res
        .status(200)
        .cookie("token", `Bearer ${token}`, { maxAge: 24 * 60 * 60 * 1000 })
        .redirect("/completeJobCard");
    } catch (error) {
      res.status(401).render("login", {
        username,
        error: error.toString().substr(error.toString().indexOf(" ") + 1),
      });
      console.error(error);
    }
  });

module.exports = router;
