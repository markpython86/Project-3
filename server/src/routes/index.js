import Authentication from '../controllers/authentication'
// import Middlewares from './middlewares'
import api from './api'

const router = require('express').Router()

router.use('/api', api)
router.post('/signup', Authentication.signup)
router.post('/signin', Authentication.signin)
router.get('/ping', (req, res) => res.send('pong'))
router.get('/', (req, res) => res.json({'source': 'https://github.com/amazingandyyy/mern-stack'}))
router.get('/daily',(req,res) => res.send('poop'))

module.exports = router;

// Middlewares.loginRequired,