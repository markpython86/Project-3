import Authentication from '../controllers/authentication';

const router = require('express').Router();
const dailyRoutes = require("../controllers/dailyController");
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
    res.send(req.user);
    console.log(req.user);
})

router.post('/userProfile', Authentication.updateProfile)

router.get('/daily', Authentication.getDaily)

router.post('/daily/new', Authentication.createDaily)

router.get('/weekly', Authentication.getWeekly)

router.post('/weekly/new', Authentication.createWeekly)



//delete route

router.delete('/daily/:id', Authentication.deleteDaily)

router.put('/daily/:id', Authentication.updateDaily)
    


export default router;