const isAuthenticated = (req, res, next) => {
  const { username, password } = req.session
  if ((username === '' && password === '') || (username === undefined)) {
    next(new Error('not logged in! cannot add posts or questions'))
  } else {
    next()
  }
}

module.exports = isAuthenticated
