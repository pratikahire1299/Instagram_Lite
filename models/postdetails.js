const mongoose = require('mongoose')

const Postdata = new mongoose.Schema({

    User_id:{ type: mongoose.Schema.Types.ObjectId},
    User_Name: {type: String, default:''},
    Heading: {type: String, default:''},	
	Description: {type: String, default:'None'},
    LastModifiedDate:{type: "string",default: "None"},
    ImageOfPost:{type:"string"}
})

module.exports = mongoose.model('Postdata', Postdata)