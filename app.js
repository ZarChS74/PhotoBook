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

app.listen(port, () => {


  console.log(`Yuk semangat terus ${port} x`)
})

