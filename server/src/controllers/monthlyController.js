import token from '../services/token';
import User from '../models/user';
import Daily from '../models/Daily';
import Weekly from '../models/Weekly';
import Monthly from '../models/Monthly';
const Moment = require('moment');

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
//     

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
           
           
            Monthly.findByIdAndUpdate(monthlyId, newMonthly, {
                    new: true
                })
                .then(newMonthly => {
                    res.sendStatus(200);
                })
                .catch(next)
    }
    
}


