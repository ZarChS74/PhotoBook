const express = require('express');
const Controller = require('../controllers/controller');
const albumRoute = express.Router()


albumRoute.get('/',Controller.findAlbum)

// albumRoute.get('/add',Controller.addAlbum)
// albumRoute.post('/add',Controller.handlerAdd)


module.exports = albumRoute