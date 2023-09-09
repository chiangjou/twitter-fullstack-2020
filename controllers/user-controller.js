const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { Op } = require('sequelize')

const userController = {
  signupPage: (req, res) => {
    res.render('signup')
  },
  signup: (req, res, next) => {
    const { account, name, email, password } = req.body

    return User.findOne({
      where: {
        [Op.or]: [{ email }, { account }]
      }
    })
      .then(user => {
        if (user) {
          if (user.toJSON().account === account) throw new Error('此帳號已被註冊')
          if (user.toJSON().email === email) throw new Error('此 Email 已被註冊')
        }
        return bcrypt.hash(password, 10)
      })
      .then(hash => User.create({
        account,
        name,
        email,
        password: hash,
        role: 'user'
      }))
      .then(() => {
        req.flash('success_messages', '成功註冊')
        return res.redirect('/signin')
      })
      .catch(err => next(err))
  }
}

module.exports = userController
