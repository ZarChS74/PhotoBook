const { User, Photo, PhotoAlbum, Profile, Tags } = require('../models');
const bcrypt = require('bcryptjs');
const automaticSender = require('../helpers/automaticSender');
const dateFormatter = require('../helpers/dateFormatter');

const { Op } = require('sequelize');

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
        console.log(req.body);
        User.findOne({ where: { username } })
            .then(user => {
                const invalidUser = `Wrong username/password`;
                if (user) {
                    const isValid = bcrypt.compareSync(password, user.password);
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
            .catch(err => {
                if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
                    const errors = err.errors.map(el => el.message);
                    res.redirect(`/login?errors=${errors}`);
                } else {
                    console.log(err);
                    res.send(err);
                }
            })
    }

    static signupHandler(req, res) {
        User.create(req.body)
            // .then((newUser) => automaticSender(newUser))
            .then(() => res.redirect('/'))
            .catch(err => {
                if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
                    const errors = err.errors.map(el => el.message);
                    res.redirect(`/signup?errors=${errors}`);
                } else {
                    res.send(err);
                }
            });

        //display validasi, cek apakah err.name === "SequelizeValidationError" di map ambil err.errors direturn el.message diredirect render signup sambil bawa error lewat query
    }

    static photos(req, res) {
        const search = req.query.search ?? "";
        const user = req.session.user;
        Photo.photoFinder(search)
            .then(photos => {
                // res.send(photos);
                res.render('photoCollection', { user, photos, dateFormatter, search })
            })
            .catch(err => { console.log(err); res.send(err) })
    }

    static home(req, res) {
        const search = req.query.search ?? "";
        const user = req.session.user;
        res.render('home', { user, search });
    }

    static profile(req, res) {
        const search = req.query.search ?? "";
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            const user = req.session.user;
            Profile.findOne({
                include: User,
                where: { UserId: user.id }
            })
                .then(profile => {
                    // res.send(profile);
                    res.render('profilePage', { profile, search, user });
                })
                .catch(err => {
                    console.log(err);
                    res.send(err);
                })
        }
    }

    static myPhotosRender(req, res) {
        const search = req.query.search ?? "";
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            const user = req.session.user;
            let photoAlbum;
            PhotoAlbum.findAll({
                include: Photo,
                where: { UserId: user.id }
            })
                .then(result => {
                    photoAlbum = result;
                    return Photo.findAll({
                        include: Tags,
                        where: { UserId: user.id }
                    })
                })
                .then(photos => {
                    // res.send({ user, photoAlbum, photos, dateFormatter })
                    res.render('myPhotos', { user, photoAlbum, photos, dateFormatter, search })
                })
                .catch(err => { console.log(err); res.send(err) });
        }
    }

    static addPhotos(req, res) {
        const search = req.query.search ?? "";
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            const user = req.session.user;
            PhotoAlbum.findAll({ where: { UserId: user.id } })
                .then(albums => {
                    res.render('addPhotos', { user, albums, search })
                })
                .catch(err => res.send(err));
        }
    }

    static addPhotosHandler(req, res) {
        const { id, username, email } = req.session.user;
        Photo.create({ ...req.body, UserId: id })
            .then()
            .then(() => res.redirect('/myPhotos'))
            .catch(err => res.send(err));
    }

    static updatePhotoRender(req, res) {
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            const user = req.session.user;
            const { photoId } = req.params;
            let albumList;
            PhotoAlbum.findAll({ where: { UserId: user.id } })
                .then(albums => {
                    albumList = albums;
                    return Photo.findByPk(photoId);
                })
                .then(photo => { res.render('editPhoto', { user, albumList, photo, search }) })
                .catch(err => { console.log(err); res.send(err) });
        }
    }

    static updatePhotoHandler(req, res) {
        const { id, username, email } = req.session.user;
        const { photoId } = req.params;
        Photo.update(
            { ...req.body, UserId: id },
            { where: { id: photoId } }
        )
            .then(() => res.redirect('/myPhotos'))
            .catch(err => res.send(err));
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/')
            }
        })
    }

}

module.exports = Controller;