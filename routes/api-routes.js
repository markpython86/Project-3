const User = require('../models').User;
const Daily = require('../models').Daily;
const Monthly = require('../models').Monthly;
const Weekly = require('../models').Weekly;
const Moment = require('moment')


module.exports = function (app) {
    app.post('/signup', (req, res) => {
        User.create(req.body)
            .then(()=> res.redirect('/daily'))
    })
    app.post('/daily/:user_id', (req, res) => {

        //get user birthdate
        //maybe adding a globale variable within the post request so we can assign the birthdate to it so we can call it later?
        User.findAll({
            where: {
                id: req.params.user_id
            }
        }).then(userInfo => {
            //here you can find how to extract the birth date from user
            console.log('================get user birthdate==============')
            console.log(userInfo[0].dataValues.birthday)
            console.log('================userinfo==============')
            // res.render('daily', { daily: dailies })

        })
        //get user birthdate ends
        var wakeupToString = (req.body.wakeup).toString()
        var wakeupReformatted = Moment(wakeupToString, 'hh:mm A').format('hh:mm');
        var sleepToString = (req.body.sleep).toString()
        var sleepReformatted = Moment(sleepToString, 'hh:mm A').format('hh:mm');
        console.log(res.User)
        console.log('=========wake=======')
        console.log(wakeupReformatted)
        console.log('=========wake=======')

        console.log('=========sleep=======')
        console.log(sleepReformatted)
        console.log('=========sleep=======')
         Daily.create({...req.body,
         userId: req.params.user_id,
         wakeup: wakeupReformatted,
         sleep: sleepReformatted
         })
            .then(() => res.redirect('/daily'))
    });
    app.post('/monthly/:user_id', (req, res) => {
        //counting next week date to add to the weeklyAt 

        
        console.log('=========days alive=======')
        //we need to figure out a way to add those dates into the moment in that format
        console.log((((Moment([1986, 4, 24]).diff([2019,3,4],'days'))* -1))-1)
        console.log('=========days alive=======')
        console.log('=========month=======')
        console.log(Moment().format('dddd')  )
        var dayToday = Moment().format('dddd')
        switch (dayToday) {
            case 'Monday':
                console.log("Mon", Moment().day(dayToday).add(5, 'days').format('MM'+'/'+'DD'))
                break;
                case 'Tuesday':
                console.log("Tue",Moment().day(dayToday).add(4, 'days').format('MM'+'/'+'DD'))
                break;
                case 'Wednesday':
                console.log("wed",Moment().day(dayToday).add(3, 'days').format('MM'+'/'+'DD'))
                break;
                case 'Thursday':
                console.log("thu",Moment().day(dayToday).add(2, 'days').format('MM'+'/'+'DD'))
                break;
                case 'Friday':
                console.log("Fri",Moment().day(dayToday).add(1, 'days').format('MM'+'/'+'DD'))
                break;
                case 'Saturday':
                console.log("sat",Moment().day(dayToday).add(7, 'days').format('MM'+'/'+'DD'))
                break;
                case 'Sunday':
                console.log("Sun",Moment().day(dayToday).add(6, 'days').format('MM'+'/'+'DD'))
                break;
        
            default:
                break;
        }
        console.log('=========month=======')
         Monthly.create({...req.body, userId: req.params.user_id})
            .then(() => res.redirect('/monthly'))
    })
    app.post('/weekly/:user_id', (req, res) => {
         Weekly.create({
             ...req.body,
             userId: req.params.user_id
             })
            .then(() => res.redirect('/weekly'))
    })
};
