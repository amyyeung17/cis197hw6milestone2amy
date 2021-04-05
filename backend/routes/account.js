const express = require('express')

const User = require('../models/user')
const inAuthenticated = require('../middleware/isAuthenticated')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body

  try {
    await User.create({ username, password })
    req.session.username = username
    req.session.password = password
    res.send(`user was created successfully! welcome ${username}`)
  } catch {
    next(new Error('user was not created successfully, please try a different username'))
  }
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body

  User.findOne({ username, password }, (err, user) => {
    if (user) {
      req.session.username = username
      req.session.password = password
      res.send('success')
    } else {
      next(new Error('failed to log in'))
    }
  })
})

router.post('/logout', inAuthenticated, (req, res) => {
  req.session.username = ''
  req.session.password = ''
  res.send(`logged out ${res.session}`)
})

module.exports = router
