const express = require('express');
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.home)

router.get('/:role/article/:userId', Controller.articles)

router.get('/:role/add/article/:userId', Controller.formAdd)

router.post('/:role/add/article/:userId', Controller.add)

router.get('/:role/article/:userId/:postId', Controller.showArticlesById)

router.get('/:role/article/:userId/:postId/reject', Controller.rejectStatusArticle)

router.get('/:role/article/:userId/:postId/approve', Controller.approveStatusArticle)

router.get('/:role/article/:userId/:postId/edit', Controller.editArticle)

router.post('/:role/article/:userId/:postId/edit', Controller.updateArticle)

router.get('/:role/article/:userId/:postId/delete', Controller.deleteArticle)

// Auth Page


module.exports = router