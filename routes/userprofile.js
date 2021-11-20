const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/usercontroller')


const auth = require("../Middleware/authentication.js"); 

router.get("/", controllers.get_all_users);   // Get data of User
router.get("/:User_id",auth, controllers.get_user_data);   // Get data of User
router.put("/:User_id", auth, controllers.Update_User_data); //Upadete data of User
router.delete("/:User_id", auth, controllers.delete_user);  // delete User



module.exports = router;