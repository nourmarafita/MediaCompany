const express = require('express');
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.home)

router.get('/add/article', Controller.formAdd)

router.post('/add/article', (req, res)=>{
    res.send('add article')
})

router.get('/:id/article', Controller.articles)

// Auth Page


module.exports = router