import React, { useState, useEffect } from 'react'
import axios from 'axios'

import s from 'styled-components'
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Homepage from './Homepage'

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
