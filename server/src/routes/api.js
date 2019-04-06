import Authentication from '../controllers/authentication';
import dailyController from '../controllers/dailyController'
import weeklyController from '../controllers/weeklyController'
import monthlyController from '../controllers/monthlyController'


const router = require('express').Router();


router.get('/', (req, res)=>{
    res.send('connected');
})

router.get('/userProfile', (req, res)=>{
    res.send(req.user);
})

router.post('/userProfile', Authentication.updateProfile)

router.get('/daily', dailyController.getDaily)
router.post('/daily/new', dailyController.createDaily)
router.delete('/daily/:id', dailyController.deleteDaily)
router.put('/daily/:id', dailyController.updateDaily)

router.get('/weekly', weeklyController.getWeekly)
// router.post('/weekly/new', weeklyController.createWeekly)
router.put('/weekly/:id', weeklyController.updateWeekly)
router.delete('/weekly/:id', weeklyController.deleteWeekly)


router.get('/monthly', monthlyController.getMonthly)
// router.post('/monthly/new', monthlyController.createMonthly)
router.put('/monthly/:id', monthlyController.updateMonthly)
router.delete('/monthly/:id', monthlyController.deleteMonthly)





    


export default router;