const express = require('express')
const exphbs = require('express-handlebars')
const helpers = require('./_helpers')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret'

// handlebars
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: handlebarsHelpers
}))
app.set('view engine', 'hbs')

// public
app.use(express.static('public'))

// body-parser
app.use(express.urlencoded({ extended: true }))

// session
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// passport
app.use(passport.initialize())
app.use(passport.session())

// flash
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.signinUser = helpers.getUser(req)
  next()
})

app.use(routes)
// use helpers.getUser(req) to replace req.user
// use helpers.ensureAuthenticated(req) to replace req.isAuthenticated()

app.listen(port, () => console.log(`App is listening on port http://localhost:${port}`))

module.exports = app
