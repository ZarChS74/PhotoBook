const express = require('express');
const router = express.Router()
const Controller = require('../controllers/controller');
const albumRoute = require('./album');
const photoRoute = require('./photo');
const UserController = require('../controllers/userController')



router.get('/',Controller.home)

router.get('/register',UserController.register)
router.post('/register',UserController.formRegister)

router.get('/register',UserController.login)

router.use('/album',photoRoute)
router.use('/photo',albumRoute)

module.exports = router