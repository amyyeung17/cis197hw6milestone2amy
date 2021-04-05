import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router, Switch, Route, Link, useHistory,
} from 'react-router-dom'

import Popup from 'reactjs-popup'
import s from 'styled-components'
import { set } from 'mongoose'

const Alignbegin = s.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column
`

const Front = s.div`
  z-index: 1
`
const Breakspace = s.div`
  padding: 10px;
`

const Input = s.input`
  width: 350px;
  height: 35px;
  border-radius: 2px; 
  border-width: medium-thin;
`
const Banner = s.div`
  position:absolute; 
  width:100%;
  height:85px;
  z-index; -100; 
  margin-left: -10px;
  margin-top: -10px;
  border-bottom: 2px solid;
  border-bottom-color: #D6D5D1;
  padding: 0px;
  background-color: #FCFBF9;
`
const Border = s.div`
  position:absolute; 
  width:415px;
  top: 82.5px;
  height:100%;
  border-right: 2px solid;
  border-right-color: #D6D5D1;
  padding: 0; 
  z-index: -100;
`
const Title = s.p`
  font-size: 38px;
  font-family: Avenir;
  font-weight: bold;
  margin-bottom: 0px;
  margin-top: 15px;
  z-index: 0
`
const Instructions = s.p`
  font-size: 18px;
  font-family: Avenir;
  font-weight: 400; 
  margin-bottom: 5px;
  margin-top: 10px;
`

const Greetings = s.p`
  position: absolute; 
  font-size: 26px;
  font-family: Avenir;
  font-weight: 400; 
  margin-bottom: 5px;
  margin-top: 15px;
  right: 200px; 
  top: 17px
`
const Loginbutton = s.button`
  background-color: #76D7C4; 
  font-family: Avenir; 
  font-size: 18px;
  color: white;
  border-radius: 5px;
  width: 400px;
  height: 50px;
  margin-top: 10px;
  font-weight: bold; 
`
const Logoutbutton = s.button`
  position: absolute; 
  background-color: #76D7C4; 
  font-family: Avenir; 
  font-size: 18px;
  color: white;
  border-radius: 5px;
  width: 100px;
  height: 50px; 
  right: 25px;
  top: 23px;
  font-weight: bold; 
`

const Question = s.button`
  display: flex; 
  flex-direction: column; 
  background-color: #FCF8F4;
  font-family: Avenir;
  font-size: 18px; 
  width: 400px;
  height: 65px; 
  border-radius: 5px; 
  margin-bottom: 10px;
  margin-top: 5px;
  
`
const Divide = s.div`
  position: absolute;
  width: 1000px;
  height: 750px; 
  left: 450px; 
  top: 55px; 
`
const TextInput = s.div`
  display: flex; 
  flex-direction: column; 
  justify-content: flex-end;
  align-content: flex-end;
`
const TitleInput = s.p`
  font-family: Avenir;
  font-size: 36px; 
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 10px;
`
const AuthorInput = s.p`
  font-family: Avenir;
  font-size: 24px; 
  margin-top: -10px;
`
const AnswerText = s.p`
  font-family: Avenir;
  font-size: 24px; 
  margin-top: -10px;
  width:825px;
  height: 200px;
`
const AnswerInput = s.input`
  font-family: Avenir;
  font-size: 22px; 
  margin-top: 5px;
  width:825px;
  padding-bottom: 250px;
  border-color: #E8E6E3;
  border-radius: 2px; 
  border-width: medium-thin;
  
`

const Answerbutton = s.button`
  background-color: #76D7C4; 
  font-family: Avenir; 
  font-size: 18px;
  color: white;
  border-radius: 5px;
  width: 100px;
  height: 50px; 
  right: 25px;
  margin-top: 10px;
  font-weight:bold;
`

const Styledmenu = s.div`
  width: 600px;
  height: 375px;
  border-width: 2px;
  border-style: solid;
  border-color: #76D7C4;
  top: 75px;
  border-radius: 3px;
  background-color: white
`

const MenuText = s.p`
  font-family: Avenir;
  font-size: 32px; 
  font-weight: bold-medium;
  margin-left:10px;
`

const MenuInputTitle = s.input`
  width: 570px;
  padding-bottom: 100px;
  border-radius: 2px; 
  border-width: medium;
  font-family: Avenir; 
  margin-left:10px;
  margin-top: -5px;
  border-width: medium-thin;
  border-color: #CDCAC5;
  border-style: solid;
  font-size: 18px
`

const Closebutton = s.button`
  align-self: flex-end;
  background-color: #76D7C4; 
  font-family: Avenir; 
  font-size: 18px;
  color: white;
  border-radius: 5px;
  width: 75px;
  height: 50px; 
  right: 25px;
  margin-top: -335px;
  margin-right:10px;
  font-weight:bold;
  
`
const Prevent = s.div`
  width:100%;
  height:100%;
  z-index: 50
`

const Homepage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState('')
  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState([])
  const [questionText, setQuestionText] = useState('')
  const [button, setButton] = useState('')
  const [_id, setId] = useState('')
  const [popUp, setPopup] = useState(false)
  const history = useHistory()
  const link = './login'

  useEffect(async () => {
    if (state === 'log') {
      setUsername(username)
    }
    if (state === 'no') {
      history.push('/login')
    }
    if (state === 'action') {
      history.push(link)
    }
  }, [state])

  useEffect(() => {
    const intervalID = setInterval(() => {
      const actual = []
      const showquestions = async () => {
        const { data } = await axios.get('/api/questions/')
        data.forEach(i => {
          if (i.questionText !== undefined && i.questionText !== '') {
            actual.push(i)
          }
        })
        setQuestion(actual)
      }
      showquestions()
    }, 2000)

    return () => clearInterval(intervalID)
  }, [])

  const a = async () => {
    const { status } = await axios.post('/api/questions/answer', { answer, _id })
    if (status === 200) {
      console.log('success!')
    }
  }

  const postquestion = async () => {
    const { status } = await axios.post('/api/questions/add', { questionText })
    if (status === 200) {
      console.log('success!')
    }
  }

  const check = async () => {
    const status = await axios.post('/api/questions/find')
    if (status.status === 200) {
      setUsername(status.data.username)
      setPassword(status.data.password)
      setButton(true)
      setState('log')
    } else {
      setButton(false)
      setState('no')
    }
  }
  check()

  const logout = async () => {
    const status = await axios.post('/account/logout/', { username, password })
    if (status.status === 200) {
      setButton(false)
      setState('no')
    } else {
      console.log('error')
    }
  }

  return (
    <>
      <Banner />
      <Border />
      <Front>
        <Alignbegin>
          <Title>Campuswire Lite</Title>
          <Breakspace />
          <Loginbutton onClick={() => (button ? setPopup(!popUp) : setState('action'))}>
            { button ? 'Add new Question+' : 'Log in to submit a questions' }
          </Loginbutton>
          <Router>
            <Instructions>
              <Link to={button ? '/' : '/login'} />
            </Instructions>
          </Router>
          <Popup open={popUp} onClose={!popUp} backdrop="static" modal nested>
            <Styledmenu>
              <TextInput>
                <MenuText>
                  Add a question
                </MenuText>
                <MenuText style={{ fontSize: '24px', marginTop: '0px' }}>
                  Question:
                </MenuText>
                <MenuInputTitle onChange={e => {
                  setQuestionText(e.target.value)
                }}
                />
                <Answerbutton
                  style={{ marginLeft: '10px', marginTop: '20px', width: '570px' }}
                  onClick={() => {
                    postquestion(questionText); setPopup(!popUp)
                  }}
                >
                  Post question!
                </Answerbutton>
                <Closebutton onClick={() => setPopup(!popUp)}>
                  Close
                </Closebutton>
              </TextInput>
            </Styledmenu>
          </Popup>
        </Alignbegin>
        <>
          {button ? (
            <Logoutbutton onClick={() => logout(username, password)}>
              Log out
            </Logoutbutton>
          ) : null}
          {button ? (
            <Greetings>
              Hello
              {' '}
              { username }
            </Greetings>
          ) : null}
        </>
        {question.map(q => (
          <>
            <Question key={q._id} onClick={() => setId(q._id)}>
              { q.questionText }
            </Question>
          </>
        ))}
        <Divide>
          {question.map(q => (
            <>
              <TextInput>
                <>
                  {_id === q._id ? (
                    <TitleInput>
                      {q.questionText}
                    </TitleInput>
                  ) : null}
                  {_id === q._id ? (
                    <AuthorInput>
                      Author:
                      { ' ' }
                      {q.author}
                    </AuthorInput>
                  ) : null}
                  {_id === q._id ? (
                    <AnswerText>
                      Answer:
                      {' '}
                      {q.answer}
                    </AnswerText>
                  ) : null}
                  {_id === q._id && button ? (
                    <AuthorInput
                      style={{ marginBottom: '0px' }}
                    >
                      Answer the question:
                    </AuthorInput>
                  ) : null}
                  {_id === q._id && button
                    ? <AnswerInput onChange={e => setAnswer(e.target.value)} /> : null}
                  {_id === q._id && button
                    ? <Answerbutton onClick={() => a(answer, _id)}> Answer </Answerbutton> : null}
                </>
              </TextInput>
            </>
          ))}
        </Divide>
      </Front>
    </>
  )
}

export default Homepage
