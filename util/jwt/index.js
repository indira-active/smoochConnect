const jwt = require('jsonwebtoken');
const KEY_ID = process.env.KEY_ID;
const SECRET = process.env.SECRET; 

function signJwt(userId){
    const result = jwt.sign({
            scope: 'appUser',
            userId: userId
        },
        SECRET, {
            header: {
                alg: 'HS256',
                typ: 'JWT',
                kid: KEY_ID
            }
        });
        return result;
}
module.exports = signJwt;