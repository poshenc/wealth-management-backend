const express = require('express')
const methodOverride = require('method-override')
// const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')

const routes = require('./routes')

const app = express()
const cors = require('cors')
const PORT = 8000

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//CROS Preflight requests
app.options('/*', (_, res) => {
  res.sendStatus(200);
});

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

module.exports = app