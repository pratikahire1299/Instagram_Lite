const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/loginRegisterController')


router.post("/Register", controllers.User_Register);
router.post("/Login", controllers.User_Login);


module.exports = router;