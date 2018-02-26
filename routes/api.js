const fs = require('fs');
const path = require('path')

const exportValue = (smooch) => {
    var express = require('express');
    var router = express.Router();

    const mongoose = require('mongoose');
    const User = mongoose.model('User');

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
    router.get('/generateusers', (req, res) => {
        const userId = req.query.userId
        console.log('userId is', userId)
        smooch.appUsers.create('5896b6d344a2206400db6b40', {
            userId
        }).then((response) => {
            fs.appendFileSync(__dirname + '/message.txt', '\n' + response.appUser._id, 'utf8');
            console.log(response);
            console.log(response.appUser._id.length, 'length')
            res.json({
                done: "done"
            })
        }).catch(err => {
            console.log(err)
        });
    })
    router.get('/search', async(req, res) => {
        /*const users = await User
            // first find users that match
            .find({
                $text: {
                    $search: req.query.q
                }
            }, {
                score: {
                    $meta: 'textScore'
                }
            })
            // the sort them
            .sort({
                score: {
                    $meta: 'textScore'
                }
            })
            // limit to only 5 results
            .limit(5);*/

            const testValue = await User
            .find({
                smoochUserId: { "$regex": req.query.q, "$options": "i" }
            }).sort({smoochUserId:1})
            res.json(testValue);
});
    router.get('/generatehundredusers', (req, res) => {
        res.json({
            done: 'done'
        })
        for (let i = 100; i >= 10; i--) {
            setTimeout(() => {
                smooch.appUsers.create('5896b6d344a2206400db6b40', {
                    userId: `test${i}@test${i}.com`
                }).then((response) => {
                    fs.appendFileSync(__dirname + '/message.txt', '\n' + response.appUser._id, 'utf8');
                }).catch(err => {
                    console.log(err)
                });
            }, i * 500)
        }
    })
    router.get('/loadusers', async(req, res) => {
        const users = await User.find({
            active: true
        })
        res.json(users)
    });
    router.get('/testsend', async(req, res) => {
        smooch.appUsers.sendMessage('test3@test3.com', {
            text: 'this is sent from the backend',
            role: 'appUser',
            type: 'text'
        }).then((response) => {
            console.log('lets see what happens on the console')
            res.json(response)
        });
    });

    router.get('/testsendBulk', async(req, res) => {
        const listId = fs.readFileSync(__dirname + '/message.txt', 'utf8');
        const arrayFormat = listId.replace(/\n/g, '');
        const newArray = arrayFormat.split(',')
        newArray.forEach((item, index) => {
            setTimeout(() => {
                smooch.appUsers.sendMessage(item, {
                    text: 'yo yo get ready for me my name is -- ' + item,
                    role: 'appUser',
                    type: 'text'
                }).then((response) => {
                    console.log('lets see what happens on the console')
                })
            }, index * 300)
        })
        res.json({
            be: "done"
        })
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