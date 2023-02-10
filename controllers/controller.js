const { Photo, Profile, User, PhotoAlbum } = require('../models/index');
const { Op } = require('Sequelize');

class Controller {
  static home(req, res){
    res.redirect('/album')
  }

  static findAlbum(req, res){
    Profile.findAll()
    .then((data) => {
        console.log(data);
      res.render('photo', data)
    }).catch((err) => {
      res.send(err)
    });
  }
  
//   static addIncubator(req, res){
//     res.render('addIncubator')
//   }

//   static handlerAdd(req, res){
//     const {name, location, level} = req.body
//     Incubator.create({ name, location, level })
//     .then((result) => {
//       res.redirect('/Incubators')
//     }).catch((err) => {
//       res.send(err)
//     });
//   }

//   static incubatorsDetail(req,res){
//     const id = req.params.incubatorId
//     Incubator.findByPk(id,{
//       include : Startup
//     })
//     .then((data) => {
//        res.render('detail',{data})
//       })
//   }

//   static addStartUp(req, res){
//     const id = req.params.incubatorId
//     Incubator.findOne({
//       where: {id}
//     })
//     .then((data) => {
//       res.render('addStartUp', {data})
//     })
//   }

//   static handlerStartUp(req, res){
//     const incubatorId = req.params.incubatorId
//     const {startUpName, founderName, educationOfFounder, roleOfFounder,valuation } = req.body
//     Startup.create({ startUpName, founderName, educationOfFounder, roleOfFounder,valuation, IncubatorId:incubatorId })
//     .then((result) => {
//       res.redirect('/Incubators')
//     }).catch((err) => {
//       console.log(err);
//       res.send(err)
//     });
//   }

//   static findAllStartUp(req, res){
//     Startup.findAll({
//       include: Incubator
//     })
//     .then((data) => {
//       res.render('startUp', {data})
//     }).catch((err) => {
//       res.send(err)
//     });
//   }

//   static deleteIncubator(req, res){
//     const idByIncubator = req.params.incubatorId
//     const idByStartup = req.params.startUpId
//     Startup.findByPk(idByIncubator)
//     .then((data) => {
//       return Startup.destroy({
//         where: {id: idByStartup}
//       })
//     })
//     .then(() => {
//       res.redirect(`/incubators/${idByIncubator}`)
//     })
//     .catch((err) => {
//       res.send(err)
//     });
//   }

  
}
module.exports = Controller