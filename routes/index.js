const express = require('express');
const router = express.Router()
const UserController = require('../controllers/usercontroller')
const Controller = require('../controllers/controller');

//get register
router.get('/register', UserController.registerForm)

//post register
router.post('/register', UserController.register)

//get login
router.get('/login', UserController.loginForm)

//post login
router.post('/login', UserController.login)

//post logout
router.get('/logout', UserController.logout)

//after login (session)

router.use((req, res ,next)=>{
    if(!req.session.userId) {
        res.redirect('/login?error=Please login first')
    }else {
        next()
    }
})

router.get('/', Controller.home)

router.get('/:role/article/:userId', Controller.articles) 

router.get('/:role/article/:userId/myArticle', Controller.myArticle)

router.get('/:role/article/:userId/:postId', Controller.showArticlesById) 



router.get('/:role/add/article/:userId', Controller.formAdd)

router.post('/:role/add/article/:userId', Controller.add) 

router.get('/:role/article/:userId/:postId/edit', Controller.editArticle) 

router.post('/:role/article/:userId/:postId/edit', Controller.updateArticle) 

router.get('/:role/article/:userId/:postId/delete', Controller.deleteArticle) 

//block user
router.use((req, res, next)=>{
    if(req.session.userId && req.session.role === 'User') {
        res.redirect('/?error=You need permission!')
    }else{
        next()
    }
})

router.get('/:role/article/:userId/:postId/reject', Controller.rejectStatusArticle) //admin

router.get('/:role/article/:userId/:postId/approve', Controller.approveStatusArticle) //admin


module.exports = router