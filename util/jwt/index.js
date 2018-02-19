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
       const testValue =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFwcF81YTcwMTQxYmU5NjRjNjAwM2ZlMDhhZmMifQ.eyJzY29wZSI6ImFwcFVzZXIiLCJ1c2VySWQiOiJhbmRyZXdqYW1lc3dpbGxpYW1zMTk5NUBnbWFpbC5jb20iLCJpYXQiOjE1MTkwMDM0NDR9.Gun2QEF7uvv7hNwuVbly3WEYp4yEsAcY2fjOA1BSyQw'
        console.log(result == testValue);
        console.log('result is',result);
        console.log(testValue);
        return result;
}
module.exports = signJwt;