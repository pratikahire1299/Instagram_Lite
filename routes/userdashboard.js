const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/postcontroller')
const users=require("../models/postdetails");

const auth = require("../Middleware/authentication.js"); 

router.get("/:postid",auth, controllers.get_user_posts);
router.post("/", auth, controllers.create_user_post);
router.delete("/:User_id", auth, controllers.delete_user_post);
router.patch("/:User_id",auth,controllers.products_update_product);

module.exports = router;