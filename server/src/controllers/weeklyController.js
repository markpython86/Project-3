import token from '../services/token';
import User from '../models/user';
import Daily from '../models/Daily';
import Weekly from '../models/Weekly';
const Moment = require('moment');
// import dailyController from './dailyController'


export default {
    
    getWeekly: (req,res,next) =>{
        // console.log("weekly", req)
                
        
        User.findById({ _id: req.user._id })
            .populate({path: 'weekly', options: { sort: { 'week': 1 } } })
            .populate('daily')
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
        .populate({path: 'weekly', options: { sort: { 'week': 1 } } })
        .then(weekly => {
             
            // let newDate = new Date()
            // let a = {"_id" : { "week": { "$week": newDate }, "year": { "$year": newDate } }}
            // console.log(weekly)
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
            console.log('update request', req)
            console.log('update id', req.params.id)
            const newWeekly = {...req.body}
           
           
            Weekly.findByIdAndUpdate(weeklyId, newWeekly, {
                    new: true
                })
                .then(newWeekly => {
                    res.sendStatus(200);
                })
                .catch(next)
    }
    
}


