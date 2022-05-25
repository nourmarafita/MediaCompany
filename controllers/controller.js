const {Post, Profile, Tag, User} = require("../models")

class Controller {
    static home (req, res) {
        res.render('home')
    }

    static articles (req, res) {
        const {id} = req.params
        let options = {include: [
            {
              model: User
            },
            {
              model: Tag
            }
          ]}
        if(id == 1) {
            options.where = {"pendingStatus": 2}
        }
        Post.findAll(options)
            .then(result=>{
                res.render('articles', {result, id})
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static formAdd (req, res) {
        res.render('formadd')
    }


}
module.exports = Controller