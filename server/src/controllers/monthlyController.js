import User from '../models/user';
import Monthly from '../models/Monthly';

export default {
    
    getMonthly: (req,res,next) =>{
                
        
        User.findById({ _id: req.user._id })
            .populate({path: 'monthly', options: { sort: { 'month': 1 } } })
            .populate('daily')
            .then(function (data) {
                res.send(data)
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
       
    },
//     createMonthly: (req, res, next) => {
// //         

//         User.findById({_id: req.user._id})
//         .populate({path: 'monthly', options: { sort: { 'month': 1 } } })
//         .then(monthly => {

//         })
//          const {
//             best,
//             worst,
//             nextWeek,
//         } = req.body;
//         let newDate = new Date()
//         const monthly = new Monthly({
           
//             week:  parseInt(Moment(newDate).format('w') - 1),
//             year: parseInt(Moment(newDate).format('YYYY')),
//             month: parseInt(Moment(newDate).format('MM')),
//             best: best,
//             worst: worst,
//             nextWeek: nextWeek,
//             user_id: req.user._id
//                 })

//                 monthly.save(function (err, savedMonthly) {
//                     if (err) {
//                         return next(err)
//                     }
//                 }).then(newMonthly => {
//                     User.findByIdAndUpdate({_id:req.user._id},{ $push: {monthly: newMonthly._id}})
//                     .then((data)=> res.sendStatus(200))
//                     .catch(err=>console.log(err))

//                     res.sendStatus(200);
//                 })
//                 .catch(next)
//     },
// //     

    deleteMonthly: (req, res, next) => {
        const monthlyID = req.params.id
        User.update({_id: req.user._id}, { $pull: { monthly: { $in:  [monthlyID]}}})

        .then(Monthly.findByIdAndRemove(monthlyID, function(err, data){
            if (err) return res.status(500).send(err);
           
            res.sendStatus(200)
        }))
        .catch(next)
        },
        
    
    updateMonthly: (req, res, next) => {
        
            const monthlyId = req.params.id;
            const newMonthly = {...req.body}
           
           
            Monthly.findByIdAndUpdate(monthlyId, newMonthly)
                .then(newMonthly => {
                    res.sendStatus(200);
                })
                .catch(next)
    }
    
}
