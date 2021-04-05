import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router, Switch, Route, Link, useHistory,
} from 'react-router-dom'

import s from 'styled-components'
import { STATES } from 'mongoose'

const Alignbegin = s.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column
`
const Breakspace = s.div`
  padding: 10px;
`

const Input = s.input`
  width: 350px;
  height: 35px;
  border-radius: 2px; 
  border-width: medium-thin;
  font-size: 18px;
`
const Title = s.p`
  font-size: 38px;
  font-family: Avenir;
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 15px
`
const Instructions = s.p`
  font-size: 18px;
  font-family: Avenir;
  margin-bottom: 5px;
  margin-top: 10px;
`
const Signupbutton = s.button`
  background-color: #76D7C4; 
  font-family: Avenir; 
  font-size: 18px;
  color: white;
  border-radius: 5px;
  width: 125px;
  height: 50px;
  margin-top: 35px;
  font-weight: bold;
`

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState('')
  const [button, setButton] = useState('')
  const history = useHistory()

  useEffect(async () => {
    if (state === 'created') {
      setUsername(username)
      setPassword(password)
      setButton(true)
      history.push('/')
    } else if (state === 'login') {
      setButton(false)
      history.push('/login')
    } else if (state === 'exit') {
      setButton(false)
      history.push('/')
    } else {
      setButton(false)
      history.push('/signup')
    }
  }, [state])

  const signups = async () => {
    const { status } = await axios.post('/account/signup', { username, password })

    if (status === 200) {
      setState('created')
    } else {
      setState('signup')
      window.alert('failed to create an account!')
    }
  }

  return (
    <Alignbegin>
      <Title>Sign Up</Title>
      <Instructions>Username:</Instructions>
      <Input onChange={e => setUsername(e.target.value)} />
      <Breakspace />
      <Instructions>Password: </Instructions>
      <Input onChange={e => setPassword(e.target.value)} />
      <Signupbutton onClick={() => {
        signups(username, password)
      }}
      >
        Sign Up
      </Signupbutton>
      <Router>
        <Instructions>
          Already have an account? Login
          <Link to="/login" onClick={() => setState('login')}> here.</Link>
        </Instructions>
      </Router>
    </Alignbegin>
  )
}

export default Signup
