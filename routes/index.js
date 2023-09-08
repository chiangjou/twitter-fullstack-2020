const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
router.use('/admin', admin)
module.exports = router
