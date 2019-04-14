import User from '../models/user';
import Weekly from '../models/Weekly';
// import dailyController from './dailyController'


export default {
    
    getWeekly: (req,res,next) =>{
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
       
    },
//     createWeekly: (req, res, next) => {
// //         

//         User.findById({_id: req.user._id})
//         .populate({path: 'weekly', options: { sort: { 'week': 1 } } })
//         .then(weekly => {

//         })
//          const {
//             best,
//             worst,
//             nextWeek,
//         } = req.body;
//         let newDate = new Date()
//         const weekly = new Weekly({
           
//             week:  parseInt(Moment(newDate).format('w') - 1),
//             year: parseInt(Moment(newDate).format('YYYY')),
//             month: parseInt(Moment(newDate).format('MM')),
//             best: best,
//             worst: worst,
//             nextWeek: nextWeek,
//             user_id: req.user._id
//                 })

//                 weekly.save(function (err, savedWeekly) {
//                     if (err) {
//                         return next(err)
//                     }
//                 }).then(newWeekly => {
//                     User.findByIdAndUpdate({_id:req.user._id},{ $push: {weekly: newWeekly._id}})
//                     .then((data)=> res.sendStatus(200))
//                     .catch(err=>console.log(err))

//                     res.sendStatus(200);
//                 })
//                 .catch(next)
//     },

    deleteWeekly: (req, res, next) => {
        const weeklyID = req.params.id
        User.update({_id: req.user._id}, { $pull: { weekly: { $in:  [weeklyID]}}})

        .then(Weekly.findByIdAndRemove(weeklyID, function(err, data){
            if (err) return res.status(500).send(err);
           
            res.sendStatus(200)
        }))
        .catch(next)
        },
        
    
    updateWeekly: (req, res, next) => {
        
            const weeklyId = req.params.id;
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
