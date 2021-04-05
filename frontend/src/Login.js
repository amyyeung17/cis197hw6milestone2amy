import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router, Switch, Route, Link, useHistory,
} from 'react-router-dom'

import s from 'styled-components'

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
  font-size:18px;
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
const Loginbutton = s.button`
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

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState('')
  const [button, setButton] = useState()
  const history = useHistory()

  useEffect(async () => {
    if (state === 'logged in') {
      setButton(true)
      history.push('/')
    } else if (state === 'signup') {
      setButton(false)
      history.push('/signup')
    } else if (state === 'exit') {
      setButton(false)
      history.push('/')
    } else {
      setButton(false)
      history.push('/login')
    }
  }, [state])

  const login = async () => {
    try {
      const x = await axios.post('/account/login', { username, password })
      if (x.status === 200) {
        setState('logged in')
      }
    } catch {
      setState('failed')
      window.alert('failed to login, try again!')
    }
  }

  return (
    <Alignbegin>
      <Title>Login</Title>
      <Instructions>Username:</Instructions>
      <Input onChange={e => setUsername(e.target.value)} />
      <Breakspace />
      <Instructions>Password: </Instructions>
      <Input onChange={e => setPassword(e.target.value)} />
      <Loginbutton onClick={() => login(username, password)}> Login </Loginbutton>
      <Router>
        <Instructions>
          Don&apos;t have an account? Create an account
          <Link to="/signup" onClick={() => setState('signup')}> here </Link>
        </Instructions>
      </Router>

    </Alignbegin>
  )
}

export default Login
