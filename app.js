const express = require('express');
const Controller = require('./controllers/controller');
const app = express();
const port = 3000;
const session = require('express-session');
const router = require('./routes/index');

app.use('/public', express.static('public'))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(router);

// app.get('/login', Controller.login);

// app.get('/signup', Controller.signup);

// app.post('/login', Controller.loginHandler);

// app.post('/signup', Controller.signupHandler);

// app.use((req, res, next) => {
//   next();
// })

// app.get('/', Controller.home);

// app.get('/photos', Controller.photos);

// app.get('/myPhotos', Controller.myPhotosRender);

// app.get('/addphoto', Controller.addPhotos);

// app.post('/addphoto', Controller.addPhotosHandler);

// app.get('/updatephoto/:photoId', Controller.updatePhotoRender);

// app.post('/updatephoto/:photoId', Controller.updatePhotoHandler);

// app.get('/myProfile', Controller.profile);

// app.get('/logout', Controller.logout);

app.listen(port, () => {


  console.log(`Yuk semangat terus ${port} x`)
})

