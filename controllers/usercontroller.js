const {User} = require("../models")
class UserController {
    static registerForm (req, res) {
        res.render('register')
    }

    static register (req, res) {
        
    }
}

module.exports = UserController