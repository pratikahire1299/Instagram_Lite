const postdetails = require('../models/postdetails')
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;


exports.get_all_posts_of_all_users = (req, res, next) => {
	postdetails.find()
	    .then(docs => {
		res.status(200).json({
		  posts_count: docs.length,
		  All_Posts: docs.map(doc => {
			return {
			  _id: doc._id,
			  User_id: doc.User_id,
			  User_Name:doc.User_Name,
			  Heading:doc.Heading,
			  Description:doc.Description,
			  LastModifiedDate:doc.LastModifiedDate
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

  exports.get_user_posts = (req, res, next) => {
	var id = req.params.User_id;       
	var new_id = new ObjectId(id);
	
	
	postdetails.find({User_id:new_id})
	  .select("_id User_Name Heading Description LastModifiedDate")
	  .exec()
	  .then(docs=> {
	if (docs) {

		//console.log(doc);
		  res.status(200).json({
			User_Posts: docs.map(doc => {
				return {
				  _id: doc._id,
				  User_id: doc.User_id,
				  User_Name:doc.User_Name,
				  Heading:doc.Heading,
				  Description:doc.Description,
				  LastModifiedDate:doc.LastModifiedDate
				};
			  })
			
	
		  });
		  
		} else {
		  res
			.status(404)
			.json({ message: "No valid entry found for provided ID" });
		}
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({ error: err });
	  });
  };


  exports.create_user_post =  (req, res, next) => {
	  const post = new postdetails({
		User_id:req.params.User_id,
		User_Name:req.body.User_Name,
		Heading:req.body.Heading,
		Description:req.body.Description,
		LastModifiedDate:req.body.LastModifiedDate
	  });
	 
	  post.save()
	  .then(result => {
		console.log(result);
		res.status(201).json({
		  message: "Post Added successfully",
		  createdPost: {
			User_Name: result.User_Name,
			Heading:result.Heading,	
			Description:result.Description	
		  }
		});
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({
		  error: err
		});
	  });
  };
 

  
  exports.Update_User_post = (req, res, next) => {
	const id = req.params.Post_id;

	const newpostdata={Heading:req.body.Heading,
		Description:req.body.Description,
		LastModifiedDate:req.body.LastModifiedDate};

	 postdetails.update(
		 {_id: id},
		 { $set:  newpostdata  },
		 {multi:true}
	     )
	  .exec()
	  .then(result => {
		res.status(200).json({
		  message: "Product updated",
		});
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({
		  error: err
		});
	  });
  };
  
  exports.delete_user_post = (req, res, next) => {
//	postdetails.remove({ _id: req.params._id })
	postdetails.deleteOne({ _id: req.params.Post_id })
	  .exec()
	  .then(result => {
		res.status(200).json({
		  message: "Post deleted",	  
		});
	  })
	  .catch(err => {
		res.status(500).json({
		  error: err
		});
	  });
  };

  exports.delete_all_user_post = (req, res, next) => {
	
	var id = req.params.User_id;       
	var new_id = new ObjectId(id);
	console.log(new_id)
	 postdetails.deleteMany( {User_id: new_id} )
		  .exec()
		  .then(result => {
			  console.log(result)
			res.status(200).json({
			  message: "All Post deleted",
			
			});
		  })
		  .catch(err => {
			res.status(500).json({
			  error: err
			});
		  });
	  };
 