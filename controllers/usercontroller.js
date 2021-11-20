const userdetails = require('../models/userdetails')
const mongoose = require("mongoose");



exports.get_all_users = (req, res, next) => {
	userdetails.find()
	    .then(docs => {
		res.status(200).json({
		  posts_count: docs.length,
		  All_Posts: docs.map(doc => {
			return {
			  _id: doc._id,
			  User_Id: doc.User_id,
			  Contact_Number: doc.Contact_Number,
			  Age: doc.Age
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

  exports.get_user_data = (req, res, next) => {
	const id = req.params.User_id;
	userdetails.findById(id)
	  .select("_id User_id Contact_Number Age")
	  .exec()
	  .then(doc => {

		if (doc) {
		  res.status(200).json({
			_id: doc._id,
			User_Id: doc.User_id,
			Contact_Number:doc.Contact_Number,
			Age: doc.Age
	
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

 

  
  exports.Update_User_data = (req, res, next) => {
	const id = req.params.User_id;
	const { Name, User_id, Contact_Number, Age, Password } = req.body;

		userdetails.update(
		 {_id: id },
		 { $set: {Name : Name,User_id:User_id,Contact_Number:Contact_Number,Age:Age} },
		 {multi:true}
	     )
	  .exec()
	  .then(result => {
		res.status(200).json({
		  message: "User Details updated",
		});
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({
		  error: err
		});
	  });
  };
  
  exports.delete_user = (req, res, next) => {
	userdetails.deleteOne({ _id: req.params.User_id })
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