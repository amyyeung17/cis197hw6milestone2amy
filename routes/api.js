const express = require('express')

const Question = require('../models/question')

const inAuthenticated = require('../middleware/isAuthenticated')

const router = express.Router()

router.get('/', (req, res) => {
  Question.find({}, (err, questions) => {
    res.send(questions)
  })
})

router.post('/add', inAuthenticated, async (req, res, next) => {
  const { questionText } = req.body
  const answer = ''
  const author = req.session.username
  if (questionText === '' || questionText === undefined) {
    next(new Error('empty or undefined question!'))
  }
  try {
    await Question.create({ questionText, answer, author })
    res.send('question posted!')
  } catch {
    next(new Error('uh oh! couldnt post the question, database error!'))
  }
})

router.post('/answer', inAuthenticated, async (req, res, next) => {
  /*
  used for testing
  const { question, answer, _id } = req.body
  */

  const { question, answer, _id } = req.body

  if (answer === '' || answer === undefined) {
    next(new Error('empty or undefined answer!'))
  }

  try {
    await Question.findOneAndUpdate({ _id }, { answer })
    res.send('Successful!')
  } catch {
    next(new Error('uh oh! couldnt post an answer, database error!'))
  }
})

module.exports = router
