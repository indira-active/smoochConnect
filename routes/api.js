const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

const exportValue = (smooch) => {
    var express = require('express');
    var router = express.Router();

    const mongoose = require('mongoose');
    const User = mongoose.model('User');
    const multer = require('multer');
    const jimp = require('jimp');
    const uuid = require('uuid');

    const multerOptions = {
      storage: multer.memoryStorage(),
      fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        next(null,true)
/*        if(isPhoto) {
          next(null, true);
        } else {
          next({ message: 'That filetype isn\'t allowed!' }, false);
        }*/
      }
    };

    const upload = multer(multerOptions).single('photo');

    const resize = async (req, res, next) => {
/*      if (!req.file) {
        next(); // skip to the next middleware
        return;
      }*/
      const extension = req.file.mimetype.split('/')[1];
      console.log(extension,'extension')
      req.body.photo = `${uuid.v4()}.${extension}`;

      const photo = await jimp.read(req.file.buffer);
      await photo.resize(800, jimp.AUTO);
      await photo.write(`./photos/${req.body.photo}`);
       setTimeout(() => {
          next();
        }, 300)
    
    };

    const resizeAndSmooch = (req, res) => {
        console.log(req.body.photo);
        const read = fs.createReadStream('./photos/'+req.body.photo);
      smooch.attachments.create('public',read).then((response) => {
            console.log(response)
            fs.appendFileSync(__dirname + '/files.txt', `,\n${response.mediaUrl}`, 'utf8');
            smooch.appUsers.sendMessage('68c03f415fce99c4be3f7156', {
                    role: 'appMaker',
                    type: 'image',
                    text: 'Hello!',
                    mediaUrl: response.mediaUrl
                }).then((values) => {
                        console.log(values);
                });
            res.redirect(response.mediaUrl);
        }).catch(err=>console.log(err))
    };


    router.post('/addToSmooch',
      upload,
      resize,
      resizeAndSmooch
    );

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
    router.post('/updateusertoactive', (req, res) => {

        const smoochId = req.body.smoochId;
        User.findOneAndUpdate({
            smoochId
        }, {
            $set: {
                active: true
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

            const users = await User
            .find({
                smoochUserId: { "$regex": req.query.q, "$options": "i" }
            }).sort({smoochUserId:1})
            res.json(users);
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

    router.get("/userInfo/:user",(req,res)=>{
        smooch.appUsers.get(req.params.user).then((response) => {
               console.log(response);
               res.json(response)
            }).catch(err=>console.log(err))
    })
    router.get('/loadusers', async(req, res) => {
        const users = await User.find({
            active: true
        })
        res.json(users)
    });

    router.get('/loadusersall', async(req, res) => {
        const users = await User.find()
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
    router.post('/newuser',(req,res)=>{
        if(req.body.userId){
                smooch.appUsers.create(req.body.userId,{
                    credentialRequired:true,
                    properties:{...req.query}
                }).then((response) => {
                console.log(response)
            }).catch(err=>{
                console.log(err)
            })
        }

        res.json({done:'done'})
    })
    router.get('/getChannels/:user',(req,res)=>{
        smooch.appUsers.getChannels(req.params.user).then(
            response => {
                res.json(response)
            });
    })
    router.get('/getSystems/:user',(req,res)=>{
        console.log(req.params)
        smooch.appUsers.getBusinessSystems(req.params.user).then(
            response => {
                res.json(response)
        });
    })
    router.post('/', (req, res) => {
        console.log(req.body)
        res.json({
            response: req.body
        })
    });
    // this route refers to the generation of a new user on our own database
    router.post('/user', async(req, res, next) => {
        const user = new User({
            smoochId: req.body.id
        });
        await user.save()
        res.status(200);
        res.end()
    })

    router.post('/sendMessage/:user',(req,res)=>{
        smooch.appUsers.sendMessage(req.params.user, {
            text: req.body.message,
            role: 'appMaker',
            name: 'drew willis',
            avatarUrl: 'https://cdn0.iconfinder.com/data/icons/iconshock_guys/512/andrew.png',
            type: 'text'
        }).then(response=>{console.log(response);res.json(response)}).catch(err=> {console.log(err);res.json(err)})
    })
// this route does not work yet
    router.get('/linkToTwilio/:user', (req,res)=>{
        smooch.appUsers.linkChannel(req.params.user, {
            type: 'twilio',
            phoneNumber: '+13058013444',
            confirmation: {
              type: 'prompt'
            }
        }).then((response) => {
               res.json(response)
        });
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