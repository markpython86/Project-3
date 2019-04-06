import token from '../services/token';
import User from '../models/user';
import Daily from '../models/Daily';
import Weekly from '../models/Weekly';
import Monthly from '../models/Monthly';
const Moment = require('moment');
// import dailyController from './dailyController'


export default {
    
    // Daily functions
    getDaily: (req,res,next) =>{
        User.findById({ _id: req.user._id })
            .populate({path: 'daily', options: { sort: { 'fullDate': 1 } } })
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
                    month: parseInt(Moment(selectedDate).format('MM')),
                    fullDate: Moment(selectedDate).format('MM-DD-YYYY')


                })

        daily.save(function (err, savedDaily) {
            if (err) {
                return next(err)
            }
        }).then(newDaily => {
            console.log('-=-=-=-=--=', req.body)

            User.findByIdAndUpdate({ _id: req.user._id }, { $push: { daily: newDaily._id } })
                .then((data) => {
                    Weekly.findOneAndUpdate({ user_id: req.user._id, week: newDaily.week, year: newDaily.year },
                        { $push: { habits: { $each: [newDaily.habit1, newDaily.habit2, newDaily.habit3] } } })
                        .then(d => {
                            const habits = []
                            habits.push(newDaily.habit1, newDaily.habit2, newDaily.habit3)
                            console.log(habits)
                            if (d == null) {
                                const weekly = new Weekly({
                                    weekStart: Moment(req.body.selectedDate).startOf('week').format('MM/DD'),
                                    weekEnd: Moment(req.body.selectedDate).endOf('week').format('MM/DD'),
                                    month: newDaily.month,
                                    week: newDaily.week,
                                    year: newDaily.year,
                                    user_id: req.user._id,
                                    habits: habits,
                                    best: '',
                                    worst: '',
                                    nextWeek: ''

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

                    Monthly.findOneAndUpdate({ user_id: req.user._id, month: newDaily.month, year: newDaily.year },
                        { $push: { habits: { $each: [newDaily.habit1, newDaily.habit2, newDaily.habit3] } } })
                        .then(d => {
                            const habits = []
                            habits.push(newDaily.habit1, newDaily.habit2, newDaily.habit3)
                            console.log(habits)
                            if (d == null) {
                                const monthly = new Monthly({
                                    monthAt: Moment(req.body.selectedDate).format('MMMM'),
                                    month: newDaily.month,
                                    week: newDaily.week,
                                    year: newDaily.year,
                                    user_id: req.user._id,
                                    habits: habits,
                                    remember: '',
                                    start: '',
                                    stop: ''

                                })


                                monthly.save(function (err, savedMonthly) {
                                    if (err) {
                                        return next(err)
                                    }
                                }).then(newMonthly => {
                                    console.log('-=-=-=-=--=', newMonthly._id)
                                    User.findByIdAndUpdate({ _id: req.user._id }, { $push: { monthly: newMonthly._id } })
                                        .then()
                                        .catch(err => console.log(err))

                                    // console.log(newDaily)
                                    // res.sendStatus(200);
                                })
                                    .catch(next)
                            }

                        })
                        .catch(err => console.log(err))
                    console.log('----------------data', newMonthly)
                    // res.
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
            // if (err) return res.status(500).send(err);
           
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
                    .then(data => {
                        Weekly.updateOne({_id: data._id, habits:req.body.oldValues.habit1},{ $set: { "habits.$" : req.body.habit1} })
                        .then(data => console.log('data', data))
                                 .catch(err => console.log('err', err))
                        Weekly.updateOne({_id: data._id, habits:req.body.oldValues.habit2},{ $set: { "habits.$" : req.body.habit2} })
                        .then(data => console.log('data', data))
                                 .catch(err => console.log('err', err))
                        Weekly.updateOne({_id: data._id, habits:req.body.oldValues.habit3},{ $set: { "habits.$" : req.body.habit3} })
                        .then(data => console.log('data', data))
                                 .catch(err => console.log('err', err))
                        console.log('data', data)})
                    .catch(err => console.log('err', err)) 
                    res.sendStatus(200);
                })
                .catch(next)
    }
}


