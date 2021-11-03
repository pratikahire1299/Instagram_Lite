const mongoose = require('mongoose')

const User = new mongoose.Schema({
	Name: {type: String, default:''},
	User_id: {type: String, default:''},
	Contact_Number: {type: Number, default:0},
	Age: {type: Number, default:0},
	Birthdate:{type: "string",format: "date"},
	Password: {type:String}
})

module.exports = mongoose.model('User', User)