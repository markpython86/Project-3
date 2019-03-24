import Authentication from '../controllers/authentication';

const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send('connected');
})

router.get('/userProfile', (req, res)=>{
    // console.log('user',req)
    res.send(req.user);
})

router.post('/userProfile', Authentication.updateProfile)

router.get('/daily', Authentication.getDaily)
router.post('/daily/new', Authentication.createDaily)


//delete route

router.delete('/daily/:id', Authentication.deleteDaily)
// router.get('/daily', (req, res)=>{
//     console.log(req.daily);
//     res.send('hello')
//     // res.send(req.daily);
// })
router.put('/daily/:id', Authentication.updateDaily)
    


export default router;