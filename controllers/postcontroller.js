const posts = require('../models/postdetails')
const mongoose = require("mongoose");



exports.get_all_posts = (req, res, next) => {
	posts.find()
	    .then(docs => {
		res.status(200).json({
		  posts_count: docs.length,
		  All_Posts: docs.map(doc => {
			return {
			  _id: doc._id,
			  User_Id: doc.User_id,
			  Heading: doc.Heading,
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
	const id = req.params.postid;
	posts.findById(id)
	  .select("_id User_id Heading Description LastModifiedDate")
	  .exec()
	  .then(doc => {
		console.log("From database", doc);
		if (doc) {
		  res.status(200).json({
			_id: doc._id,
			User_Id: doc.User_id,
			Heading: doc.Heading,
			Description:doc.Description,
			LastModifiedDate:doc.LastModifiedDate
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
	const post = new posts({
	  _id: new mongoose.Types.ObjectId(),
	  User_Id: req.body.User_Id,
	  Heading: req.body.Heading,
	  Description: req.body.Description,
	  LastModifiedDate:req.body.LastModifiedDate
	});
	post
	  .save()
	  .then(result => {
		console.log(result);
		res.status(201).json({
		  message: "Post Created successfully",
		  createdPost: {
			User_id: result.User_Id,
			Heading: result.Heading,
			Description: result.Description		
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
 
  exports.delete_user_post = (req, res, next) => {
	posts.remove({ _id: req.params._id })
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
  
  exports.products_update_product = (req, res, next) => {
	const id = req.params.postid;
	const updateOps = {};
	for (const ops of req.body) {
	  updateOps[ops.propName] = ops.value;
	}
	Product.update({ _id: id }, { $set: updateOps })
	  .exec()
	  .then(result => {
		res.status(200).json({
		  message: "Product updated",
		  request: {
			type: "GET",
			url: "http://localhost:3000/products/" + id
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
  