const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
router.use('/admin', admin)
const tweetController = require('../controllers/tweet-controller')
router.get('/tweets', tweetController.getTweets)

// Fallback
router.use('/', (req, res) => res.redirect('/tweets'))
module.exports = router
