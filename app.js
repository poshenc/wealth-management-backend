const express = require('express')
const methodOverride = require('method-override')
// const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')

const app = express()
// const cors = require('cors')
const PORT = 3001

// app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('hellow world!!')
})

// app.post(`http://localhost:${PORT}/api/insert`, (req, res) => {
//   const indexName = req.body.name

//   MarketIndices.create({ name })
//     .then(() => console.log('posted!'))
// })



app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})