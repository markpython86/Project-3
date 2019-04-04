import Authentication from '../controllers/authentication'
import Middlewares from './middlewares'
import api from './api'

const router = require('express').Router()

router.use('/api', Middlewares.loginRequired, api)
router.post('/signup', Authentication.signup)
// router.post('/daily/new', Authentication.createDaily)
router.post('/signin', Authentication.signin)
router.get('/ping', (req, res) => res.send('pong'))
router.get('/', (req, res) => res.json({'source': 'https://github.com/markpython86/Project-3'}))


module.exports = router;

// Middlewares.loginRequired,