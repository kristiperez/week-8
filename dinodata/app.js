const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const path = require('path')
const indexRouter = require('./routes/index')

var pgp = require('pg-promise')();
var connectionString = 'postgres://goxmlxcn:qjBmiizJBr3AAvyO6fWkFZWZLX8X-Ok-@raja.db.elephantsql.com:5432/goxmlxcn';
global.db = pgp(connectionString)

app.use(express.urlencoded())
app.use('/',indexRouter)
app.use(express.static('images'))
const VIEWS_PATH = path.join(__dirname,'/views')

app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine', 'mustache')

app.listen(3000,() => {console.log('Server is running...')})