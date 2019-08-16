const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.render('index')
})

router.post('/get-name',(req,res) => {
    let guestname = req.body.guestname
    let letter = guestname[0]
    // console.log(letter)
    // res.send('ok')
    db.one('SELECT name,imageurl,diet,rank,letter FROM dinos WHERE letter = $1',[letter]).then((dino) => {
        res.render('dino-detail',dino)
    })

})


router.get('/dinos',async (req,res) => {
    let dinos = await db.any('SELECT name,imageurl FROM dinos;')
    res.render('dinos',{dinos:dinos})
})

module.exports = router