const exportValue = (smooch) => {
    var express = require('express');
    var router = express.Router();
    
    const mongoose = require('mongoose');
    const User = mongoose.model('User');

    const signJwt = require('../util/jwt');
    
    router.get('/', (req, res) => {

        const userId = req.query.userId;
        console.log('on the route side userId is',userId)
        res.json({
            jwt: signJwt(userId)
        })

    });
    router.post('/updateuser', (req, res) => {

        const smoochId = req.body.smoochId;
        User.findOneAndUpdate({
            smoochId
        }, {
            $set: {
                active: false
            }
        }, {
            new: true,
            runValidators: true,
            context: 'query'
        }).then(val => {
            res.json({
                valIs: val
            })
        }).catch(err => {
            res.json({
                errIs: err
            })
        })
    });
    router.get('/loadusers', async(req, res) => {
        const users = await User.find({
            active: true
        })
        res.json(users)
    });
    router.get('/loadtestusers', async(req, res) => {
        const test = new User({
            active: "true",
            smoochId: "test",
            smoochUserId: "test"
        }).save()
        res.json({
            done: "done"
        })
    });

    router.post('/', (req, res) => {
        console.log(req.body)
        res.json({
            response: req.body
        })
    });
    router.post('/user', async(req, res, next) => {
        const user = new User({
            smoochId: req.body.id
        });
        await user.save()
        res.status(200);
        res.end()
    })
    router.get('/getmessages', (req, res) => {
        smooch.appUsers.getMessages(req.query.appUser, req.query.time ? {
            after: req.query.time
        } : undefined).then((response) => {
            res.json(response)
        }).catch(err => {
            console.error('looks like there was an error see it below');
            console.error(err)
        })
    })


    return router
}

module.exports = exportValue