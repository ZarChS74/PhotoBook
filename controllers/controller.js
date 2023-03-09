const { User, Photo, PhotoAlbum, Profile } = require('../models');
const bcrypt = require('bcryptjs');
const automaticSender = require('../helpers/automaticSender');

class Controller {

    static login(req, res) {
        const { errors } = req.query;
        res.render('login', { errors });
    }

    static signup(req, res) {
        const { errors } = req.query;
        res.render('signup', { errors });
    }

    static loginHandler(req, res) {
        const { username, password } = req.body;
        User.findOne({ where: { username } })
            .then(user => {
                if (user) {
                    const isValid = bcrypt.compareSync(password, user.password);
                    const invalidUser = `Wrong username/password`;
                    if (isValid) {
                        req.session.user = { id: user.id, username: username, email: user.email };
                        res.redirect('/')
                    } else {
                        res.redirect(`/login?errors=${invalidUser}`)
                    }
                } else {
                    res.redirect(`/login?errors=${invalidUser}`)
                }
            })
            .catch(err => res.send(err));
    }

    static signupHandler(req, res) {
        User.create(req.body)
            // .then((newUser) => automaticSender(newUser))
            .then(() => res.redirect('/'))
            .catch(err => res.send(err));
    }

    static home(req, res) {
        const user = req.session.user;
        res.render('home', { user });
    }

    static myPhotosRender(req, res) {
        const {id, username, email} = req.session.user;
        Photo.findAll({
            where : {UserId : id }
        })
            .then(photos => res.send(photos))
            .catch(err => {console.log(err);res.send(err)});
    }

}

module.exports = Controller;