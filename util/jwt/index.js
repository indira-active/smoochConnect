const jwt = require('jsonwebtoken');
const KEY_ID='app_5a70141be964c6003fe08afc';
const SECRET='hIraqmK_mDq53XembMweqa86';
//put back after testing
/* const KEY_ID = process.env.KEY_ID;
const SECRET = process.env.SECRET; */

function signJwt(userId){
    console.log('userId is',userId);
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
        console.log(result == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFwcF81YTcwMTQxYmU5NjRjNjAwM2ZlMDhhZmMifQ.eyJzY29wZSI6ImFwcFVzZXIiLCJ1c2VySWQiOiJhbmRyZXdqYW1lc3dpbGxpYW1zMTk5NUBnbWFpbC5jb20iLCJpYXQiOjE1MTkwMDI4ODB9.f2muxRn9alInTgbdGfhttkGqRU9rTT3AKp0OPGPjDco');
        return result;
}
module.exports = signJwt;