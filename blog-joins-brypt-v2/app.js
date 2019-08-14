const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const path = require('path')
const blogsRouter = require('./routes/blogs')
const indexRouter = require('./routes/index')

const session = require('express-session')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

var pgp = require('pg-promise')();
var connectionString = 'postgres://localhost:5432/blogdb';
global.db = pgp(connectionString)



app.use(express.urlencoded())
app.use('/', blogsRouter)
app.use('/users', indexRouter)
app.use(express.static('static'))
const VIEWS_PATH = path.join(__dirname,'/views')

app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine', 'mustache')


app.listen(3001,() => {console.log('Server is running...')})