const  Express =require("express");
const router=Express.Router();

const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const dbconnection = require("../DbConnection.js");
const TOKEN_KEY = "thisistheecretkeyformyprojectcalledminiinstagramapplication";

const User = require("../models/userdetails");


router.post("/register", async (req, res) => {
    try {
      const { Name, User_id, Contact_Number, Age, Password } = req.body;
      const oldUser = await User.findOne({ User_id });
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      encryptedPassword = await bcrypt.hash(Password, 10);
  
      const user = await User.create({
        Name,
        User_id,
        Contact_Number,
        Age,
        Password: encryptedPassword,
      });
  
      const token = jwt.sign(User_id, TOKEN_KEY, {
        algorithm: "HS256",
      })
      console.log("token:", token)
      user.token = token;

      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  
  });
  
  // Login
 router.post("/login", async (req, res) => {
  
    try {
  
      const { User_id, Password } = req.body;
      if (!(User_id && Password)) {
        res.status(400).send("All input is required");
      }
      const user = await User.findOne({ User_id });
  
      if (user && (await bcrypt.compare(Password, user.Password))) {
  
        const token = jwt.sign(User_id, TOKEN_KEY, {
          algorithm: "HS256",
        })
        console.log("token:", token)
  
        user.token = token;
  
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  
  });
  
module.exports= router;  