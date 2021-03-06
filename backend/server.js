const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')
const path = require('path')

const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Integration
app.use(express.static('dist'))
app.use(express.json())

app.use(
  cookieSession({
    name: 'session',
    keys: ['secret-code'],
  }),
)

app.get('/', (req, res) => res.send('HELLO'))

app.use('/account', AccountRouter)
app.use('/api/questions', ApiRouter)

const errorHandling = (err, req, res, next) => {
  res.status(500).send(`${err}`)
}
app.use(errorHandling)

// Integration
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
