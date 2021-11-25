const Express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const homepage = require("./routes/homepage.js");
const userdashboard = require("./routes/userdashboard.js");
const userprofile= require("./routes/userprofile.js");
const loginRegister= require("./routes/loginRegisterPage.js");

const dbconnection = require("./DbConnection.js");

const User = require("./models/userdetails");
const auth = require("./Middleware/authentication.js");


const Port = process.env.Port || 2000;


const app = Express();
app.use(Express.json());



app.use('/homepage', auth, homepage);
app.use('/userdashboard', auth, userdashboard);
app.use('/userprofile',userprofile);
app.use('/loginRegisterPage',loginRegister);


app.listen(Port, () => {
  console.log("App Serever Started");
})

module.exports = app;