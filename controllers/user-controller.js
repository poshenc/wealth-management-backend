const bcrypt = require('bcryptjs') //載入 bcrypt
const db = require('../models')
const { User } = db

const userController = {
  signUp: (req, res) => {
    const { name, email, password } = req.body.userData

    bcrypt.hash(password, 10)
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then((response) => {
        res.json(response)
      })
      .catch(error => { console.log(error) })
  }
}
module.exports = userController
