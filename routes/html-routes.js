const User = require('../models').User;
const Daily = require('../models').Daily;
const Monthly = require('../models').Monthly;
const Weekly = require('../models').Weekly;

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.render('login')
    });

    app.get('/signup', (req, res) => {
        res.render('signup')
    });

    app.get('/daily', (req, res) => {
        Daily.findAll({
            include: [User]
        }).then(dailies => {
            // console.log(dailies)
            res.render('daily', { daily: dailies })

        })
    });

    app.get('/weekly', (req, res) => {
        Weekly.findAll({
            include: [User]
        }).then(weeklies => {
            // console.log(weeklies)
            res.render('weekly', { weekly: weeklies })

        })
    });

    app.get('/monthly', (req, res) => {
        Monthly.findAll({
            include: [User]
        }).then(monthlies => {
            res.render('monthly', { monthly: monthlies })

        })
    });

    app.get('/daily/new', (req, res) => {
        // console.log(req)
        User.findAll({
            include: [Daily, Weekly, Monthly]
        }).then(users => {
            res.render('daily-new', { users: users })
        })
    });

    app.get('/monthly/new', (req, res) => {
        User.findAll({
            include: [Daily, Weekly, Monthly]
        }).then(users => {
            res.render('monthly-new', { users: users })
        })
    });

    app.get('/weekly/new', (req, res) => {
        User.findAll({
            include: [Daily, Weekly, Monthly]
        }).then(users => {
            res.render('weekly-new', { users: users })
        })
    });

    app.get("*", function (req, res) {
        res.render("404");
    });

};
