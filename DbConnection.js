const  Express =require("express");
const router=Express.Router();

var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
const mongoose=require('mongoose');

uri="mongodb://localhost:27017/cricketdb";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("Connection Successful")).catch((err)=>console.log("Failed"));



module.exports = router;