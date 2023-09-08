const express = require('express')
const exphbs = require('express-handlebars')
const helpers = require('./_helpers')
const flash = require('connect-flash')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000

// handlebars
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: handlebarsHelpers
}))
app.set('view engine', 'hbs')

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

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`App is listening on port http://localhost:${port}`))

module.exports = app
