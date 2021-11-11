const mongoose = require('mongoose')

const Postdata = new mongoose.Schema({
    User_id: {type: String, default:''},
	Heading: {type: String, default:''},	
	Description: {type: String, default:'None'},
    LastModifiedDate:{type: "string",default: "None"}
})

module.exports = mongoose.model('Postdata', Postdata)