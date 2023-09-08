const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

// controller
const tweetController = require('../controllers/tweet-controller')
const userController = require('../controllers/user-controller')

// middleware
const { generalErrorHandler } = require('../middleware/error-handler')

const admin = require('./modules/admin')
router.use('/admin', admin)

// User Signup
router.get('/signup', userController.signupPage)
router.post('/signup', userController.signup)

// User Signin
router.get('/signin', userController.signinPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signin)

// Logout
router.get('/logout', userController.logout)

router.get('/tweets', tweetController.getTweets)

// Fallback
router.use('/', (req, res) => res.redirect('/tweets'))

router.use('/', generalErrorHandler)

module.exports = router
