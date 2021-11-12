const postdetails = require('../models/postdetails')
const mongoose = require("mongoose");



exports.get_all_posts = (req, res, next) => {
	postdetails.find()
	    .then(docs => {
		res.status(200).json({
		  posts_count: docs.length,
		  All_Posts: docs.map(doc => {
			return {
			  _id: doc._id,
			  User_Id: doc.User_id,
			  Posts:doc.Posts
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
	const id = req.params.postid;
	postdetails.findById(id)
	  .select("_id User_id Posts")
	  .exec()
	  .then(doc => {

		if (doc) {
		  res.status(200).json({
			_id: doc._id,
			User_Id: doc.User_id,
			Posts:doc.Posts
	
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


  exports.create_user_post = (req, res, next) => {
	const id = req.params.User_id;
	const newpostdata={Heading:req.body.Heading,
					   Description:req.body.Description,
					   LastModifiedDate:req.body.LastModifiedDate};
	
	postdetails.update({_id:id},{$push:{Posts : newpostdata}})
	  
	  .then(result => {
		console.log(result);
		res.status(201).json({
		  message: "Post Added successfully",
		  createdPost: {
			User_id: result.User_id,
			Posts:result.Posts	
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
	const id = req.params.User_id;
	const updateOps = {};
	for (const ops of req.body) {
	  updateOps[ops.propName] = ops.value;
	}
	postdetails.update({ _id: id }, { $set: updateOps })
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
	postdetails.deleteOne({ _id: req.params.User_id })
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