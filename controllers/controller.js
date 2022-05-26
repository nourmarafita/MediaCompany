const {Post, Profile, Tag, User} = require("../models")
var Filter = require('bad-words');
var customFilter = new Filter({ placeHolder: 'x'});
const { Op } = require('sequelize')

class Controller {
    static home (req, res) {
        const {error} = req.query
        const {userId, role} = req.session
        res.render('home', {userId, role, error})
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
        if(role === "User") {
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
                console.log(customFilter.clean('motherfucker'));
                res.render('articles', {result, role, userId, postId, formatPending, customFilter})
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
                res.render('myArticle', {result, role, userId, postId, formatPending, customFilter})
            })
            .catch(err=>{
                console.log(err);
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
        Post.create({ title, content, imgUrl, TagId, UserId })
        .then(() => {
            console.log(userId, '========>');
            res.redirect(`/${role}/article/${userId}/myArticle`)})
        .catch((err) => {
            console.log(err);
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
                console.log(result);
                const formatPending = Post.formatPendingStatus()
                res.render('detail-article',{result, role, userId, postId,formatPending, customFilter})
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