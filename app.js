const express = require('express')
const router = require('./routes/index')
const app = express()
const port = 3002

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use(router)

app.listen(port, () => {
  console.log(` Let's CatchUp SOON!. Promise ${port}`)
})