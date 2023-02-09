const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', Controller.home)
app.get('/album',Controller.getAlbum)
// app.get("/", Controller.showHomepage);
// app.get("/commanders", Controller.showCommanders);
// app.get("/troops", Controller.showTroops);
// app.get("/troops/train", Controller.showAddTroops);
// app.post("/troops/train", Controller.showSubmitTroops);




app.listen(port, () => {
  console.log(`Let's catchUp soon!, promise ${port}...`)
})