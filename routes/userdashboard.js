const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/postcontroller')
const users=require("../models/postdetails");

const auth = require("../Middleware/authentication.js"); 


router.post("/", auth, controllers.create_user_post);
router.delete("/:User_id", auth, controllers.delete_user_post);
router.get("/:postid",auth, controllers.get_user_posts);

module.exports = router;