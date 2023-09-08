const express = require('express')
const handlebars = require('express-handlebars')
const helpers = require('./_helpers')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', handlebars({ extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(routes)
// use helpers.getUser(req) to replace req.user
// use helpers.ensureAuthenticated(req) to replace req.isAuthenticated()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`App is listening on port http://localhost:${port}`))

module.exports = app
