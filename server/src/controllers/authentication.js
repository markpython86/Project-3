import token from '../services/token';
import User from '../models/user';
import Daily from '../models/Daily';
import Weekly from '../models/Weekly';
const Moment = require('moment');
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
        User.findById({ _id: req.user._id })
            .populate('daily')
            .then(function (data) {
                // console.log('working')
                
                
                res.send(data)
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
       
    },
    createDaily: (req, res, next) => {
        // console.log('-=-=-=--=-=-=-=-=-==-=-',req)
        // const formattedDate = Moment(req.body.selectedDate).format('MM-DD-YYYY')
       
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
                // console.log('90909009-----------',req.user._id)


                const daily = new Daily({
                    highlights: highlights,
                    positive: positive,
                    negative: negative,
                    wakeup: wakeup,
                    sleep: sleep,
                    habit1: habit1,
                    habit2: habit2,
                    habit3: habit3,
                    selectedDate: selectedDate,
                    user_id: req.user._id,
                    week: parseInt(Moment(selectedDate).format('w') - 1),
                    year: parseInt(Moment(selectedDate).format('YYYY')),
                    fullDate: Moment(selectedDate).format('MM-DD-YYYY')


                })

                daily.save(function (err, savedDaily) {
                    if (err) {
                        return next(err)
                    }
                }).then(newDaily => {
                    // console.log('-=-=-=-=--=',newDaily)

                    User.findByIdAndUpdate({ _id: req.user._id }, { $push: { daily: newDaily._id } })
                        .then((data) => {
                            Weekly.findOneAndUpdate({ user_id: req.user._id, week: newDaily.week, year: newDaily.year }, { $push: { habits: { $each: [newDaily.habit1 , newDaily.habit2 , newDaily.habit3]}} })
                                .then(d => {
                                    if (d == null) {
                                        const weekly = new Weekly({

                                            week: newDaily.week,
                                            year: newDaily.year,
                                            user_id: req.user._id
                                        })

                                        weekly.save(function (err, savedWeekly) {
                                            if (err) {
                                                return next(err)
                                            }
                                        }).then(newWeekly => {
                                            console.log('-=-=-=-=--=', newWeekly._id)
                                            User.findByIdAndUpdate({ _id: req.user._id }, { $push: { weekly: newWeekly._id } })
                                                .then()
                                                .catch(err => console.log(err))

                                            // console.log(newDaily)
                                            // res.sendStatus(200);
                                        })
                                            .catch(next)
                                    } 

                                })
                                .catch(err => console.log(err))
                            console.log('----------------data', newDaily)
                            res.sendStatus(200)
                        })
                        .catch(err => console.log(err))
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
            // console.log('update request', req)
            const newDaily = {
                ...req.body,
                week: parseInt(Moment(req.body.selectedDate).format('w')-1),
                year: parseInt(Moment(req.body.selectedDate).format('YYYY'))}
            Daily.findByIdAndUpdate(dailyId, newDaily, {
                    new: true
                })
                .then(newDaily => {
                    console.log('req h1', req.body.oldValues.habit1)
                    console.log('req h2', req.body.oldValues.habit2)
                    // console.log('req h3', req)

                    Weekly.findOneAndUpdate({user_id: req.user._id, week: newDaily.week, year: newDaily.year}
                    )
                    // , {habits: [req.body.oldValues.habit1, req.body.oldValues.habit2, req.body.oldValues.habit3]},
                    // { $set :  { "habits.$": [req.body.habit1, req.body.habit2, req.body.habit3]  }})
                    .then(err => {
                        Weekly.updateOne({_id:err._id, habits:req.body.oldValues.habit1},{ $set: { "habits.$" : req.body.habit1} })
                        .then(err => console.log('data', err))
                                 .catch(err => console.log('err', err))
                        Weekly.updateOne({_id:err._id, habits:req.body.oldValues.habit2},{ $set: { "habits.$" : req.body.habit2} })
                        .then(err => console.log('data', err))
                                 .catch(err => console.log('err', err))
                        Weekly.updateOne({_id:err._id, habits:req.body.oldValues.habit3},{ $set: { "habits.$" : req.body.habit3} })
                        .then(err => console.log('data', err))
                                 .catch(err => console.log('err', err))
// //                         err.update(
//    { },
//    { $set: { "habits.$[element]" : req.body.habit1 } },
//    { multi: true,
//      arrayFilters: [ { "element": { $elemMatch: req.body.oldValues.habit1 } } ]
//    }
// )
                        console.log('data', err)})
                    .catch(err => console.log('err', err))  
      
                
                    // Weekly.updateOne({ user_id: req.user._id, week: newDaily.week, year: newDaily.year }, { $push: { habits: {$each: [newDaily.habit1 , newDaily.habit2 , newDaily.habit3]}} })
                    //             .then()
                    //             .catch()

                    res.sendStatus(200);
                })
                .catch(next)
    },
    // Weekly functions

    getWeekly: (req,res,next) =>{
        // console.log("weekly", req)
                
        
        User.findById({ _id: req.user._id })
            .populate('weekly')
            .then(function (data) {
                res.send(data)
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
            // Daily.aggregate( [ { $group : { _id : "$habbit1" } } ] ).then(data=> console.log("data", data))
       
    },
    createWeekly: (req, res, next) => {
//         

        User.findById({_id: req.user._id})
        .populate('weekly')
        .then(weekly => {
             
            // let newDate = new Date()
            // let a = {"_id" : { "week": { "$week": newDate }, "year": { "$year": newDate } }}
            console.log(weekly)
        })
         const {
            best,
            worst,
            nextWeek,
        } = req.body;
        let newDate = new Date()
        // console.log(d)
        // console.log('user request', req.daily)

        const weekly = new Weekly({
           
            week:  parseInt(Moment(newDate).format('w') - 1),
            year: parseInt(Moment(newDate).format('YYYY')),
            best: best,
            worst: worst,
            nextWeek: nextWeek,
            user_id: req.user._id
                    // habbits: d
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