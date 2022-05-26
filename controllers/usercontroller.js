const {User} = require("../models")
const bcrypt = require('bcryptjs');
class UserController {
    static registerForm (req, res) {
        res.render('register')
    }

    static register (req, res) {
        const {userName, password, role} = req.body
        User.create({userName, password, role})
            .then(()=>{
                res.redirect('/login')
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static loginForm (req, res) {
        const {error} = req.query
        res.render('login', {error})
    }

    static login (req, res) {
        const {userName, password} = req.body
        User.findOne({where:{userName: userName}})
            .then(result=>{
                if(result) {
                    const invalidPassword = bcrypt.compareSync(password, result.password)
                    if(invalidPassword) {
                        req.session.userId = result.id
                        req.session.role = result.role
                        return res.redirect('/')
                    }else {
                        return res.redirect('/login?error=invalid username / password')
                    }
                }else {
                    return res.redirect('/login?error=invalid username / password')
                }
            })
            .catch(err=>{
                res.send(err)
            })
    }

    static logout (req, res) {
        req.session.destroy(function(err) {
            if(err) {
                res.send(err)
            }else {
                res.redirect('/login')
            }
          })
    }
}

module.exports = UserController