const {User, Photo, Profile, PhotoAlbum} = require('../models/index');

class Controller {
    static home(req, res){
        res.render('home')
    }

    static getAlbum(req, res){
        Profile.findAll({
            include: Photo,
        })
        .then((data) => {
            res.render('photo', data)
            console.log(data);
        }).catch((err) => {
            res.send(err)
        });
    }

}
module.exports = Controller