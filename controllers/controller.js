const {Post, Profile, Tag, User} = require("../models")
const { Op } = require('sequelize')

class Controller {
    static home (req, res) {
        res.render('home')
    }

    static articles (req, res) {
        const {role, userId, postId} = req.params
        const { search } = req.query
        let options = {include: [
            {
              model: User
            },
            {
              model: Tag
            }
          ]}
        if(role == 1) {
            options.where = {"pendingStatus": 2}
        }

        if(search){
            options.where = { 
                ...options.where, 
                title: {
                [Op.iLike]: `%${search}%`
                }
            }
        }
        Post.findAll(options)
            .then(result=>{
                const formatPending = Post.formatPendingStatus()
                res.render('articles', {result, role, userId, postId, formatPending})
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static myArticle (req, res) {
        const {role, userId, postId} = req.params
        const { search } = req.query
        let options = {include: [
            {
              model: User
            },
            {
              model: Tag
            }
          ], where: {UserId: userId}}

        if(search){
            options.where = { 
                ...options.where, 
                title: {
                [Op.iLike]: `%${search}%`
                }
            }
        }

        Post.findAll(options)
            .then(result=>{
                const formatPending = Post.formatPendingStatus()
                res.render('myArticle', {result, role, userId, postId, formatPending})
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static formAdd (req, res) {
        const {role, userId} = req.params
        Tag.findAll()
            .then(result=>{
                res.render('formadd', {result, role, userId})
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static add (req, res) {
        const { title, content, imgUrl, TagId} = req.body
        const {role, userId} = req.params
        const UserId = userId
        // console.log(req.params);
        Post.create({ title, content, imgUrl, TagId, UserId })
        .then(() => {
            console.log(userId, '========>');
            res.redirect(`/${role}/article/${userId}/myArticle`)})
        .catch((err) => {
            if (err.name === 'SequelizeValidationError'){
                return res.send(err.errors.map(e => e.message))
            }
            // console.log(id);
            res.send(err)
        })
    }

    static showArticlesById(req,res){
        const {role, userId, postId} = req.params
        Post.findByPk(req.params.postId,{
            include: [{
              model: User
            },
            {
              model: Tag
            }]
        })
            .then(result=>{
                res.render('detail-article',{result, role, userId, postId})
            })
            .catch((err)=>{
                res.send(err)
            })
    }

    static rejectStatusArticle(req,res){
        const {role, userId, postId} = req.params
        Post.update({ pendingStatus:  3},{where: { id: +postId }})
        .then(() => {
            res.redirect(`/${role}/article/${userId}`)
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static approveStatusArticle(req,res){
        const {role, userId, postId} = req.params
        Post.update({ pendingStatus:  2},{where: { id: +postId }})
        .then(() => {
            res.redirect(`/${role}/article/${userId}`)
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static editArticle(req,res){
        const {role, userId, postId} = req.params
        Post.findByPk(postId,{
            include: [{
              model: User
            },
            {
              model: Tag
            }]
        })
            .then(result=>{
                // res.send(result)
                res.render('form-edit',{result, role, userId, postId})
            })
            .catch((err)=>{
                res.send(err)
            })
    }

    static updateArticle(req,res){
        const { title, content, imgUrl, TagId } = req.body
        const {role, userId, postId} = req.params
        const UserId = userId
        Post.update({ 
            title, content, imgUrl, TagId, UserId
        },
            {where:{
                id: postId
            }
            })
            .then(()=>{
                res.redirect(`/${role}/article/${userId}`)
            })
            .catch((err)=>{
                if(err.name === 'SequelizeValidationError'){
                    err = err.errors.map(el=> el.message)
                }
                res.send(err)
            })
    }

    static deleteArticle(req,res){
        const {role, userId, postId} = req.params
        Post.destroy({ where: { id: postId }})
        .then(() => res.redirect(`/${role}/article/${userId}`))
        .catch((err) => {res.send(err)})
    }
}
module.exports = Controller