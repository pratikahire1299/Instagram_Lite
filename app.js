const  Express =require("express");
const jst=require("jsonwebtoken");

const homepage=require("./homepage.js");
const userdashboard=require("./userdashboard.js");
const dbconnection=require("./DbConnection.js");

const Port= process.env.Port || 2000;

/*const createToken = async()=>{
    const token=await jwt.sign({_id:101},"secretkey","thesecretkeyformyprojectcalledminiinstagramapplication")
    console.log(token);
}

createToken();

*/

const app=Express();


app.use('/homepage',homepage);
app.use('/userdashboard',userdashboard)

app.listen(Port,()=>{
    console.log("App Serever Started");   
})

  
module.exports = app;