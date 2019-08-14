const express = require('express')
const router = express.Router()

router.get('/',async (req,res) => {
    let blogs = await db.any('SELECT blogid,title,body,author,created FROM blogs;')
    res.render('index', {blogs:blogs})
})

router.post('/add-blog',(req,res) => {
    let title = req.body.title
    let body = req.body.article
    let author = req.body.author

    db.none('INSERT INTO blogs(title,body,author) VALUES($1,$2,$3)',[title,body,author]
    ).then(() => {
        res.redirect('/')
    })
})

router.post('/delete-blog',(req,res) => {
    let blogId = req.body.blogId

    db.none('DELETE FROM blogs WHERE blogid = $1',[blogId]
    ).then (() => {
        res.redirect('/')
    })
})

router.get('/edit-blog/:blogid',(req,res) => {
    let blogid = req.params.blogid
    db.one('SELECT blogid,title,body,author FROM blogs WHERE blogid = $1', [blogid])
    .then((blog) => {
        console.log(blog)
        res.render('edit-blog', blog)
    })
    
})

router.post('/update-blog',(req,res) => {
    let title = req.body.title
    let body = req.body.article
    let author = req.body.author
    let blogId = req.body.blogId

    db.none('UPDATE blogs SET title = $1, body = $2, author = $3 WHERE blogId = $4',[title,body,author,blogId])
    .then(() => {
        res.redirect('/')
    })

})

router.get('/add-blog', (req,res) => {
    res.render('add-blog')
})

module.exports = router