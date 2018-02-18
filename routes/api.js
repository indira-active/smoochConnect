var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const KEY_ID = process.env.KEY_ID;
const SECRET = process.env.SECRET;

const signJwt = function(userId) {
    return jwt.sign({
        scope: 'appUser',
        userId: userId
    },
    SECRET,
    {
        header: {
            alg: 'HS256',
            typ: 'JWT',
            kid: KEY_ID
        }
    });
}



router.get('/', (req,res)=>{

	const userId = req.query.userId;

	res.json({jwt:signJwt(userId)})

    });
router.get('/loadusers', async (req,res)=>{
        const users = await User.find({})
        res.json(users)
        });

router.post('/', (req,res)=>{
    console.log(req.body)
    res.json({response:req.body})
    });
router.post('/user',async (req, res, next) => {
        const user = new User({ smoochId: req.body.id});
        await user.save()
        res.status(200);
        res.end()
      })


module.exports = router;

