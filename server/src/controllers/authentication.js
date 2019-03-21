import token from '../services/token';
import User from '../models/user';
import Daily from '../models/Daily';


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
        console.log('==========',req.Daily)
        // console.log('==========',req.Daily)
        Daily.find({})
        
        .then(data => 
            res.send(data)
        )
        .catch(next)
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
        // User.findByIdAndUpdate({_id:req.user._id},{ $push: {daily: req.daily._id}})

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
                    // console.log(newDaily)
                    res.sendStatus(200);
                })
                .catch(next)
    }



}