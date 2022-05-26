const express = require('express')
const Controller = require('./controllers/controller')
const UserController = require('./controllers/usercontroller')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))

//get register
app.get('/register', UserController.registerForm)

//post register
app.post('/register', UserController.register)

app.get('/', Controller.home)

app.get('/:role/article/:id', Controller.articles)

app.get('/:role/add/article/:id', Controller.formAdd)

app.post('/:role/add/article/:id', Controller.add)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})