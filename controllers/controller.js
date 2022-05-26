const {Post, Profile, Tag, User} = require("../models")

class Controller {
    static home (req, res) {
        res.render('home')
    }

    static articles (req, res) {
        const {role, id} = req.params
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
        Post.findAll(options)
            .then(result=>{
                res.render('articles', {result, role, id})
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static formAdd (req, res) {
        const {role, id} = req.params
        Tag.findAll()
            .then(result=>{
                res.render('formadd', {result, role, id})
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static add (req, res) {
        console.log(req.body);
        res.send(req.body)
    }


}
module.exports = Controller