var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

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

router.post('/', (req,res)=>{
    console.log(req.body)
    res.json({response:req.body})
    });


module.exports = router;
