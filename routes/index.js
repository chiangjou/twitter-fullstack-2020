const express = require('express')
const router = express.Router()
const tweetController = require('../controllers/tweet-controller')
const userController = require('../controllers/user-controller')
const admin = require('./modules/admin')
router.use('/admin', admin)

// User Signup
router.get('/signup', userController.signupPage)
router.post('/signup', userController.signup)

router.get('/tweets', tweetController.getTweets)

// Fallback
router.use('/', (req, res) => res.redirect('/tweets'))
module.exports = router
