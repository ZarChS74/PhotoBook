const { User, Photo, PhotoAlbum, Profile, Tags } = require('../models');
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

            //display validasi, cek apakah err.name === "SequelizeValidationError" di map ambil err.errors direturn el.message diredirect render signup sambil bawa error lewat query
    }

    static home(req, res) {
        const user = req.session.user;
        res.render('home', { user });
    }

    static myPhotosRender(req, res) {
        const { id, username, email } = req.session.user;
        let photoAlbum;
        PhotoAlbum.findOne({
            include: Photo,
            where: { UserId: id }
        })
            .then(result => {
                photoAlbum = result;
                return Photo.findAll({
                    include: Tags,
                    where: { UserId: id }
                })
            })
            .then(photos => res.send({ photoAlbum, photos }))
            .catch(err => { console.log(err); res.send(err) });
    }

    static addPhotos(req, res) {
        const { id, username, email } = req.session.user;
        PhotoAlbum.findAll()
            .then(albums => res.render('addPhotos', { albums }))
            .catch(err => res.send(err));
    }

    static addPhotosHandler(req, res) {
        const { id, username, email } = req.session.user;
        Photo.create({ ...req.body, UserId: id })
            .then(() => res.redirect('/myPhotos'))
            .catch(err => res.send(err));
    }

    static updatePhotoRender(req, res) {
        const { photoId } = req.params;
        Photo.findByPK(photoId)
            .then(photo => res.render('editPhoto', { photo }))
            .catch(err => res.send(err));
    }

    static updatePhotoRender(req, res) {
        const { id, username, email } = req.session.user;
        const { photoId } = req.params;
        Photo.update(
            {...req.body, UserId : id},
            {where : {id : photoId}}
        )
            .then(() => res.redirect('/myPhotos'))
            .catch(err => res.send(err));
    }

}

module.exports = Controller;