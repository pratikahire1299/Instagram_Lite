const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/postcontroller')
const users=require("../models/postdetails");

const auth = require("../Middleware/authentication.js"); 

router.get("/:postid",auth, controllers.get_user_posts);   // Get posts of User
router.put("/:User_id", auth, controllers.create_user_post); //ADD Post of User
router.delete("/:User_id", auth, controllers.delete_all_user_post);  // delete all posts of User
router.put("/:User_id/:date", auth, controllers.delete_user_post); // delete specific post according to data 
router.patch("/:User_id/:date",auth,controllers.Update_User_post); //Update any post according to date

module.exports = router;