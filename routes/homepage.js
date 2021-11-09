const  Express =require("express");
const router=Express.Router();
const controllers = require('../controllers/postcontroller')
const posts=require("../models/postdetails");
router.get('/', (req, res) => {
const data="123";
    console.log("This is Homepage");
	if (data == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid request. Resource undefined.'
		})

		return
	}

	// res.json({
	// 	confirmation: 'success',
	// 	Status_code: "200",
    //     data:"data"
        
	// })

    const readposts=async()=>{
        try{
            const result=await posts.find();
            //console.log(result);
            res.json({
                confirmation: 'success',
                Status_code: "200",
                data:result
                
            })
        }catch(err){
            console.log(err);
        }
    }
    readposts();
})



module.exports = router;