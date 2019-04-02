import token from '../services/token';
import User from '../models/user';
import Daily from '../models/Daily';
import Weekly from '../models/Weekly';
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
    // Daily functions
    getDaily: (req,res,next) =>{
        User.aggregate( [ (
            { $match: {'_id': req.user._id}},
            { $unwind: "$daily" },
            { $group: {'id':"$daily",count: { $sum: 1 }}})
        ]).exec(function ( e, d ) {
    console.log( 'd',d ) 
    // Daily.aggregate([(
        
    //     { $match: {'_id': d[0]._id}},
    //     { '$habbit1': '$habiit1'}
    // )]) .exec(function ( e, d ) {
    // console.log( 'd',d ) }); 
    });         

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
       
    },
    createDaily: (req, res, next) => {
         const {
            highlights,
            positive,
            negative,
            wakeup,
            sleep,
            habit1,
            habit2,
            habit3,
            selectedDate

        } = req.body;
        

        const daily = new Daily({
                    highlights: highlights,
                    positive: positive,
                    negative: negative,
                    wakeup: wakeup,
                    sleep:sleep,
                    habit1: habit1,
                    habit2: habit2,
                    habit3: habit3,
                    selectedDate: selectedDate
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
        },
        
    
    updateDaily: (req, res, next) => {
        
            const dailyId = req.params.id;
            console.log('update request', req.body)
            const newDaily = req.body
            Daily.findByIdAndUpdate(dailyId, newDaily, {
                    new: true
                })
                .then(newDaily => {
                    res.sendStatus(200);
                })
                .catch(next)
    },
    // Weekly functions

    getWeekly: (req,res,next) =>{
        console.log("weekly", req)
                
        
        User.findById({ _id: req.user._id })
            .populate('weekly')
            .then(function (data) {
                console.log('working',data)
                res.send(data)
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
            // Daily.aggregate( [ { $group : { _id : "$habbit1" } } ] ).then(data=> console.log("data", data))
       
    },
    createWeekly: (req, res, next) => {
        User.findById({_id: req.user._id})
        .populate('daily')
        .then(daily => {
            console.log()
        })
         const {
            best,
            worst,
            nextWeek,
        } = req.body;
        // console.log('user request', req.daily)

        const weekly = new Weekly({
                    best: best,
                    worst: worst,
                    nextWeek: nextWeek
                })

                weekly.save(function (err, savedWeekly) {
                    if (err) {
                        return next(err)
                    }
                }).then(newWeekly => {
                    console.log('-=-=-=-=--=',newWeekly._id)
                    User.findByIdAndUpdate({_id:req.user._id},{ $push: {weekly: newWeekly._id}})
                    .then((data)=> res.sendStatus(200))
                    .catch(err=>console.log(err))

                    // console.log(newDaily)
                    res.sendStatus(200);
                })
                .catch(next)
    },

    deleteWeekly: (req, res, next) => {
        const weeklyID = req.params.id
        User.update({_id: req.user._id}, { $pull: { weekly: { $in:  [weeklyID]}}})

        .then(Weekly.findByIdAndRemove(weeklyID, function(err, data){
            if (err) return res.status(500).send(err);
           
            console.log('after delete', data)
            res.sendStatus(200)
        }))
        .catch(next)
        },
        
    
    updateWeekly: (req, res, next) => {
        
            const weeklyId = req.params.id;
            console.log('update request', req.body)
            const newWeekly = req.body
           
           
            Weekly.findByIdAndUpdate(weeklyId, newWeekly, {
                    new: true
                })
                .then(newWeekly => {
                    res.sendStatus(200);
                })
                .catch(next)
    }
    



}