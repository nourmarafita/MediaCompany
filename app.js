const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))

app.get('/', Controller.home)

app.get('/add/article', Controller.formAdd)

app.post('/add/article', (req, res)=>{
    res.send('add article')
})

app.get('/:id/article', Controller.articles)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})