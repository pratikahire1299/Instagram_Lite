const userdetails = require('../models/userdetails')
const mongoose = require("mongoose");



exports.get_all_users = async (req, res, next) => {
	await userdetails.find()
	    .then(docs => {
		res.status(200).json({
		  posts_count: docs.length,
		  All_Posts: docs.map(doc => {
			return {
			  _id: doc._id,
			  User_Name: doc.User_Name,
			  Name:doc.Name,
			  Contact_Number: doc.Contact_Number,
			  Birthdate:doc.Birthdate
			};
		  })
		});
	  })
	  .catch(err => {
		res.status(500).json({
		  error: err
		});
	  });
  };

  exports.get_user_data = async  (req, res, next) => {
	const id = req.params.User_id;
	await userdetails.findById(id)
	  .select("_id User_Name Contact_Number Birthdate")
	  .exec()
	  .then(doc => {

		if (doc) {
		  res.status(200).json({
			_id: doc._id,
			User_Name: doc.User_Name,
			Name:doc.Name,
			Contact_Number: doc.Contact_Number,
			Birthdate:doc.Birthdate
	
		  });
		} else {
		  res
			.status(404)
			.json({ message: "No valid User found for provided ID" });
		}
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	  });
  };

 

  
  exports.Update_User_data = async (req, res, next) => {
	const id = req.params.User_id;
	const { Name, User_Name, Contact_Number, Birthdate, Password } = req.body;

	await userdetails.update(
		 {_id: id },
		 { $set: {Name : Name,User_Name:User_Name,Contact_Number:Contact_Number,Birthdate:Birthdate} },
		 {multi:true}
	     )
	  .exec()
	  .then(doc => {
		  if(doc){
		res.status(200).json({
		  message: "User Details updated",
		  	_id: doc._id,
			User_Name: doc.User_Name,
			Name:doc.Name,
			Contact_Number: doc.Contact_Number,
			Birthdate:doc.Birthdate
		  
		});}
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({
		  error: err
		});
	  });
  };
  
  exports.delete_user = async (req, res, next) => {
	await userdetails.deleteOne({ _id: req.params.User_id })
	  .exec()
	  .then(result => {
		res.status(200).json({
		  message: "User deleted",
		  
		});
	  })
	  .catch(err => {
		res.status(500).json({
		  error: err
		});
	  });
  };