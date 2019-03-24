import token from '../services/token';
import User from '../models/user';
import Daily from '../models/Daily';
// import dailyController from './dailyController'


export default {
    signup: (req, res, next) => {
        const {
            email,
            password,
            firstName,
            lastName
        } = req.body;

        if (!email || !password) {
            return res
                .status(422)
                .send({
                    error: 'You must provide email and password.'
                });
        }
        User
            .findOne({
                email: email
            }, function (err, existingUser) {
                if (err) return res.status(422).send(err);
                if (existingUser) {
                    return res
                        .status(422)
                        .send({
                            error: 'Email is in use'
                        });
                }
                const user = new User({
                    name: {
                        first: firstName,
                        last: lastName
                    },
                    email: email,
                    password: password
                })

                user.save(function (err, savedUser) {
                    if (err) {
                        return next(err)
                    }

                    res.json({
                        success: true,
                        token: token.generateToken(savedUser)
                    })
                })
            })
    },

    signin: (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res
                .status(422)
                .send({
                    error: 'You must provide email and password.'
                });
        }
        User
            .findOne({
                email: email
            }, function (err, existingUser) {
                if (err || !existingUser) {
                    return res.status(401).send(err || {
                        error: "User Not Found"
                    })
                }
                if (existingUser) {
                    existingUser.comparedPassword(password, function (err, good) {
                        if (err || !good) {
                            return res.status(401).send(err || 'User not found')
                        }

                        res.send({
                            token: token.generateToken(existingUser)
                        })
                    })
                }
            })
    },

    updateProfile: (req, res, next) => {
        req.user.comparedPassword(req.body.password, (err, good) => {
            if (err || !good) return res.status(401).send(err || 'Incorrect Password')
            const userId = req.user._id;
            const newProfile = {
                name: {
                    first: req.body.firstName,
                    last: req.body.lastName
                }
            };
            delete newProfile.email;
            delete newProfile.phone;
            delete newProfile.password;

            User.findByIdAndUpdate(userId, newProfile, {
                    new: true
                })
                .then(newUser => {
                    res.sendStatus(200);
                })
                .catch(next)
        })
    },
    getDaily: (req,res,next) =>{
        User.findById({ _id: req.user._id })
            .populate('daily')
            .then(function (data) {
                console.log('working')
                res.send(data)
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
        // console.log('==========',req)
        // console.log('==========',req.Daily)
        // Daily.find({})
        
        // .then(data => 
        //     res.send(data)
        // )
        // .catch(next)
    },
    createDaily: (req, res, next) => {
         const {
            highlight,
            pos,
            neg,
            wake,
            sleep
        } = req.body;
        // console.log('user request', req.daily)

        const daily = new Daily({
                    highlights: highlight,
                    positive: pos,
                    negative: neg,
                    wakeup: wake,
                    sleep:sleep
                })

                daily.save(function (err, savedDaily) {
                    if (err) {
                        return next(err)
                    }
                }).then(newDaily => {
                    console.log('-=-=-=-=--=',newDaily._id)
                    User.findByIdAndUpdate({_id:req.user._id},{ $push: {daily: newDaily._id}})
                    .then((data)=> res.sendStatus(200))
                    .catch(err=>console.log(err))

                    // console.log(newDaily)
                    res.sendStatus(200);
                })
                .catch(next)
    },

    deleteDaily: (req, res, next) => {
        console.log('im here',req.user.daily)
        const dailyID = req.params.id
        User.update({_id: req.user._id}, { $pull: { daily: { $in:  [dailyID]}}})

        .then(Daily.findByIdAndRemove(dailyID, function(err, data){
            if (err) return res.status(500).send(err);
           
            console.log('after delete', data)
            res.sendStatus(200)
        }))
        .catch(next)
        }
        
    



}