const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Models = require('./models') //why do you have to use the dot here

// const session = require('express-session')
// const io = require('socket.io')(http)

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
// }))


let users = []

router.get('/register',(req,res) => {
    res.render('register')
})

router.post('/register',(req,res) => {
    let username = req.body.username
    let password = req.body.password

    bcrypt.hash(password,10).then(function(hash) {
        db.none('INSERT INTO users (username,password) VALUES($1,$2);',[username,hash])
        .then(() => {
            console.log('success')
            res.redirect('/users/login')
        })
    })
})

router.get('/login',(req,res) => {
    res.render('login')
})

router.post('/login',(req,res) => {
    let username = req.body.username
    let password = req.body.password

    db.one('SELECT userid,username,password FROM users WHERE username = $1',[username])
    .then(user => {
        if(user) {
            //compare the password
            bcrypt.compare(password,user.password).then(function(result) {
                if(result) { //if password matches
                    //put the userid or username in session
                    // req.session.user = { userId: user.userid, username: user.username }
                    res.redirect('/')
                } else {
                    res.render('login', {message: 'Invalid username or password'})
                }
            });
        } else {
            res.render('login', {message: 'Invalid credentials'})
        }
        // what is the catch scenario here...??
    }).catch(error => res.render('login', {message: 'Invalid'}))

})

router.get('/dashboard',(req,res) => {
    db.any('SELECT users.userid,username,title, body FROM users JOIN blogs ON blogs.userid=users.userid')
    .then(results => {

        results.forEach((record) => {
            if(users.length == 0) {
                let user = new Models.User(record.userid, record.username)
                let blog = new Models.Blog(record.title, record.body, record.author)
                user.addBlog(blog) 
                users.push(user)

            } else { // if the users is not empty

                let persistedUser = users.find(user => user.userId == record.userid)
                if(persistedUser) {
                    //create a blog for persisted user
                    let blog = new Models.Blog(record.title,record.body,record.author)
                    persistedUser.addBlog(blog)
                } else { // for a different user
                    let user = new Models.User(record.userid, record.username)
                    let blog = new Models.Blog(record.title,record.body,record.author)
                    user.addBlog(blog)
                    users.push(user)
                }
            }
        })
        console.log(users)
        res.json(users)
    })
})

module.exports = router