const { User, Photo, PhotoAlbum, Profile } = require('../models');
const bcrypt = require('bcryptjs');
const automaticSender = require('../helpers/automaticSender');

class Controller {

    static home(req, res) {

        res.render('home');
    }

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
                        req.session.user = { id: user.id, username, role: user.role };
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
            .then((newUser) => automaticSender(newUser))
            .then(() => res.redirect('/'))
            .catch(err => res.send(err));
    }

    static home(req, res) {
        res.render('home');
    }

    static home(req, res) {
        res.render('home');
    }
}

module.exports = Controller;