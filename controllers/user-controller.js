const bcrypt = require('bcryptjs') //載入 bcrypt
const db = require('../models')
const { User } = db

const userController = {
  signUp: async (req, res) => {
    try {
      const { name, email, password, passwordCheck } = req.body.userData

      let errorMessages = []

      //加入多種錯誤訊息
      if (!name || !email || !password || !passwordCheck) {
        errorMessages.push({ message: 'All inputs are required!' })
      }

      if (password !== passwordCheck) {
        errorMessages.push({ message: 'Current password do not match!' })
      }

      // 通過初步驗證
      if (!errorMessages.length) {
        const salt = await bcrypt.genSalt(10)
        hash = await bcrypt.hash(password, salt)
        // 查看是否已存在
        const userEmail = await User.findOne({ where: { email } })
        if (userEmail) {
          res.statusMessage = "error"
          return res.status(200).json({ status: 'error', message: 'Email already Exist!' })
        } else {
          await User.create({
            name,
            email,
            password: hash
          })
          return res.status(200).json({ status: 'success', message: 'Signed up Successfully!' })
        }
      } else {
        res.statusMessage = "error"
        return res.status(200).json({ status: 'error', message: errorMessages[0].message })
      }
    }
    catch (err) {
      console.warn(err)
      return res.status(500)
    }
  }
}
module.exports = userController
