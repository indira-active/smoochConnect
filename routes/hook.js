const hook = (io)=>{
var express = require('express');
var router = express.Router();

router.get('/', (req,res)=>{
	console.log(`req.body is ${req.body} and this is a get request on the hook route`)
	});

router.post('/', (req,res)=>{
		io.to('testRoom').emit('testEvent', JSON.stringify(req.body,null,2))
    console.log(`req.body is ${req.body} and this is a post request on the hook route`)
    res.status(200);
    res.send()
    });
return router
}


module.exports = hook;
