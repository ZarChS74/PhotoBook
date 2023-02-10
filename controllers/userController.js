const { User } = require('../models')
class UserController {
  static login(req, res){
    res.render('login')
  }
  static register(req, res){
    res.render('login')
  }

  static formRegister(req, res){
    const {username, password} = req.body
    User.create({ username, password})
    .then((newUser) => {
      res.redirect('/login')
    }).catch((err) => {
        res.send(err)
    });
  }
}

module.exports = UserController