var express = require('express');
var router = express.Router();

router.get('/', (req,res)=>{
	console.log(`req.body is ${req.body} and this is a get request on the hook route`)
	});

router.post('/', (req,res)=>{
    console.log(`req.body is ${req.body} and this is a post request on the hook route`)
    });


module.exports = router;
