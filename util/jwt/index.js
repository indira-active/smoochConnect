const jwt = require('jsonwebtoken');
const KEY_ID='app_5a70141be964c6003fe08afc';
const SECRET='hIraqmK_mDq53XembMweqa86';
//put back after testing
/* const KEY_ID = process.env.KEY_ID;
const SECRET = process.env.SECRET; */

function signJwt(userId){
    console.log('userId is',userId)
    return jwt.sign({
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
}
console.log(signJwt('awilliams1995'))
module.exports = signJwt;