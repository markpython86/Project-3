import Authentication from '../controllers/authentication';

const router = require('express').Router();
// const dailyRoutes = require("../controllers/dailyController");
// const weeklyRoutes = require("../controllers/weeklyController");
// const monthlyRoutes = require("../controllers/monthlyController");

// Daily routes
// router.use("/daily", dailyRoutes);

// Weekly routes
// router.use("/weekly", weeklyRoutes);

// Monthly routes
// router.use("/monthly", monthlyRoutes);

router.get('/', (req, res)=>{
    res.send('connected');
})

router.get('/userProfile', (req, res)=>{
    res.send(req.user);
})

router.post('/userProfile', Authentication.updateProfile)

export default router;