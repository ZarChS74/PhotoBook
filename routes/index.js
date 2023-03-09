const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

router.get('/login', Controller.login);

router.get('/signup', Controller.signup);

router.post('/login', Controller.loginHandler);

router.post('/signup', Controller.signupHandler);

router.use((req, res, next) => {
  next();
})

router.get('/', Controller.home);

router.get('/photos', Controller.photos);

router.get('/myPhotos', Controller.myPhotosRender);

router.get('/myPhotos/:photoId/delete', Controller.deletePhoto);

router.get('/addphoto', Controller.addPhotos);

router.post('/addphoto', Controller.addPhotosHandler);

router.get('/updatephoto/:photoId', Controller.updatePhotoRender);

router.post('/updatephoto/:photoId', Controller.updatePhotoHandler);

router.get('/myProfile', Controller.profile);

router.get('/logout', Controller.logout);

module.exports = router;