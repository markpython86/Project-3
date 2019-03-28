import Authentication from '../controllers/authentication';

const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send('connected');
})

router.get('/userProfile', (req, res)=>{
    res.send(req.user);
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