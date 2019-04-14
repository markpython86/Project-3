import token from '../services/token';
import User from '../models/user';
import Daily from '../models/Daily';
import Weekly from '../models/Weekly';
import Monthly from '../models/Monthly';
const Moment = require('moment');
// import dailyController from './dailyController'


export default {

    // Daily functions
    getDaily: (req, res, next) => {
        User.findById({ _id: req.user._id })
            .populate({ path: 'daily', options: { sort: { 'fullDate': 1 } } })
            .then(function (data) {


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
            User.findByIdAndUpdate({ _id: req.user._id }, { $push: { daily: newDaily._id } })
                .then((data) => {
                    Weekly.findOneAndUpdate({ user_id: req.user._id, week: newDaily.week, year: newDaily.year },
                        { $push: { habits: { $each: [newDaily.habit1, newDaily.habit2, newDaily.habit3] } } })
                        .then(d => {
                            const habits = []
                            habits.push(newDaily.habit1, newDaily.habit2, newDaily.habit3)
                            if (d === null) {

                                const weekly = new Weekly({
                                    weekStart: Moment(req.body.selectedDate).startOf('week').format('MM/DD'),
                                    weekEnd: Moment(req.body.selectedDate).endOf('week').format('MM/DD'),
                                    week: newDaily.week,
                                    year: newDaily.year,
                                    month: newDaily.month,
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
                                    User.findByIdAndUpdate({ _id: req.user._id }, { $push: { weekly: newWeekly._id } })
                                        .then()
                                        .catch(err => console.log(err))

                                })
                                    .catch(next)
                            }

                        }).catch(err => console.log(err))

                    // res.
                    Monthly.findOneAndUpdate({ user_id: req.user._id, month: newDaily.month, year: newDaily.year },
                        { $push: { habits: { $each: [newDaily.habit1, newDaily.habit2, newDaily.habit3] } } })
                        .then(d => {
                            const habits = []
                            habits.push(newDaily.habit1, newDaily.habit2, newDaily.habit3)
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
                                    User.findByIdAndUpdate({ _id: req.user._id }, { $push: { monthly: newMonthly._id } })
                                        .then()
                                        .catch(err => console.log(err))

                                }).catch(next)

                            }

                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            res.sendStatus(200);
        })
            .catch(next)

    },

    deleteDaily: (req, res, next) => {
        const dailyID = req.params.id
        User.update({ _id: req.user._id }, { $pull: { daily: { $in: [dailyID] } } })
            .then(Daily.findByIdAndRemove(dailyID, function (err, data) {
                res.sendStatus(200)
            }))
            .catch(next)
    },


    updateDaily: (req, res, next) => {

        const dailyId = req.params.id;
        const newDaily = {
            ...req.body,
            week: parseInt(Moment(req.body.selectedDate).format('w') - 1),
            year: parseInt(Moment(req.body.selectedDate).format('YYYY'))
        }


        Daily.findByIdAndUpdate(dailyId, newDaily)
            .then(newDaily => {
                Weekly.findOne({ user_id: newDaily.user_id }
                )
                    .then(data => {
                        Weekly.updateOne({ _id: data._id, habits: req.body.oldValues.habit1 }, { $set: { "habits.$": req.body.habit1 } })
                            .then()
                            .catch(err => console.log('err', err))
                        Weekly.updateOne({ _id: data._id, habits: req.body.oldValues.habit2 }, { $set: { "habits.$": req.body.habit2 } })
                            .then()
                            .catch(err => console.log('err', err))
                        Weekly.updateOne({ _id: data._id, habits: req.body.oldValues.habit3 }, { $set: { "habits.$": req.body.habit3 } })
                            .then()
                            .catch(err => console.log('err', err))

                    }).catch(err => console.log('err', err));
                Monthly.findOne({ user_id: newDaily.user_id }
                )
                    .then(data => {
                        Monthly.updateOne({ _id: data._id, habits: req.body.oldValues.habit1 }, { $set: { "habits.$": req.body.habit1 } })
                            .then()
                            .catch(err => console.log('err', err))
                        Monthly.updateOne({ _id: data._id, habits: req.body.oldValues.habit2 }, { $set: { "habits.$": req.body.habit2 } })
                            .then()
                            .catch(err => console.log('err', err))
                        Monthly.updateOne({ _id: data._id, habits: req.body.oldValues.habit3 }, { $set: { "habits.$": req.body.habit3 } })
                            .then()
                            .catch(err => console.log('err', err))
                    }).catch(err => console.log('err', err))
                res.sendStatus(200);
            })
            .catch(next)
    }
}


