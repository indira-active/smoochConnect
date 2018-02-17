const hook = (io)=>{
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');


router.get('/', (req,res)=>{
	console.log(`req.body is ${req.body} and this is a get request on the hook route`)
	});

router.post('/', async (req,res)=>{
		const msg = JSON.stringify(req.body,null,2);
		io.to('testRoom').emit('testEvent', msg)
   console.log(`req.body is ${msg} and this is a post request on the hook route`)
   console.log('trigger');
   console.log(req.body.trigger);
   console.log('^^^^^^^^^^^^^^^^^^^^^')
   console.log('appUser');
   console.log(req.body.appUser);
   console.log('^^^^^^^^^^^^^^^^^^^^^')
   let temp = req.body.appUser?req.body.appUser._id:null;
   let user;
   try{
    if(temp){
      user = await User.findOne({ smoochId: req.body.appUser._id })
      if (!user) {
        let newUser = new User({ smoochId: req.body.appUser._id,smoochUserId:req.body.appUser.userId || null});
        await newUser.save()
      }else if(user && !user.smoochUserId && req.body.appUser.userId){
        User.findOneAndUpdate(
          { smoochId: user.smoochId },
          { $set: {smoochUserId:req.body.appUser.userId}}
        ).then(res=>{console.log('res is!!!!',res)}).catch(err=>{console.log('err is:  ',err)})
      }
     }
   }
   catch(err){
     console.error(err)
   }
   
    res.status(200);
    res.send()
    });
return router
}


module.exports = hook;
