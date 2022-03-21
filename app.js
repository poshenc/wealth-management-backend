const express = require('express')
const methodOverride = require('method-override')
// const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')

const app = express()
const cors = require('cors')
const PORT = 3001

const db = require('./models')
const Market = db.Market
const User = db.User

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// app.get('/', (req, res) => {
//   res.send('hellow world!!')
// })

app.get('/', (req, res) => {
  return Market.findAll({
    raw: true,
    nest: true
  })
    .then(markets => { res.send(markets) })
    .catch(err => console.log(err))
})

app.post(`http://localhost:${PORT}/api/insert`, (req, res) => {
  const { ticker, image, price, movement, change } = req.body
  const UserId = 1

  Market.create({ ticker, image, price, movement, change, userId: UserId })
    .then(() => console.log('posted!'))
})



app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})