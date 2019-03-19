import Authentication from '../controllers/authentication';

const router = require('express').Router();
// const dailyRoutes = require("../controllers/dailyController");
// const weeklyRoutes = require("../controllers/weeklyController");
// const monthlyRoutes = require("../controllers/monthlyController");

// Daily routes
// router.get("/api/daily", (req, res)=>{
//     res.send(req.id)
// });

// Weekly routes
// router.use("/weekly", weeklyRoutes);

// Monthly routes
// router.use("/monthly", monthlyRoutes);

router.get('/', (req, res)=>{
    res.send('connected');
})

router.get('/userProfile', (req, res)=>{
    console.log(req)
    res.send(req.user);
})

router.post('/userProfile', Authentication.updateProfile)

router.get('/daily', Authentication.getDaily)


// router.get('/daily', (req, res)=>{
//     console.log(req.daily);
//     res.send('hello')
//     // res.send(req.daily);
// })


export default router;