import Header from './components/Header'
import Footer from './components/Footer'
import QuestionDisplay from './components/Question'
import AnswersDisplay from './components/Answer'
import { Question, Answer } from './models/QAModels.mjs'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'

function App() {

  // Fake Database of questions
  const fakeQuestion = new Question(1, 'how are you?', 'me@mail.com', 24, '2025-04-01')
  const fakeAnswers = []
  fakeAnswers.push(new Answer(10, 'ok', 'a@b.com', 100, '2025-04-01'))
  fakeAnswers.push(new Answer(11, 'it crashes', 'c@b.com', 101, '2025-03-31'))

  // Application state
  const [question, setQuestion] = useState(fakeQuestion)
  const [answers, setAnswers] = useState(fakeAnswers)

  // Handler functions for managing the 'answers' state
  const delAnswer = (id) => {
    setAnswers((prevAnswers) => prevAnswers.filter(a => a.id != id))
  }

  const upVote = (id) => {
    setAnswers((prevAnswers) => prevAnswers.map(a => a.id != id ? a : { ...a, score: a.score + 1 }))
  }

  const addAnswer = (ans) => {
    setAnswers((prevAnswers) => {
      // create a new 'local' unique ID (not needed when we have a real DB)
      console.log(prevAnswers.map(a => a.id))
      const newId = Math.max(...prevAnswers.map(a => a.id)) + 1
      return [...prevAnswers, { ...ans, id: newId }]
    })
  }

  const editAnswer = (ans) => {
    // console.log(ans)
    setAnswers((prevAnswers) => prevAnswers.map((a) => a.id != ans.id ? a : ans))
  }

  const answersActions = { editAnswer, addAnswer, upVote, delAnswer }
  // we could store the different actions into one object, so that it's easier to pass down
  // and used like props.actions.editAnswer

  return (
    <>
      <Header />
      <QuestionDisplay question={question} />
      <AnswersDisplay answers={answers} delAnswer={delAnswer} upVote={upVote} addAnswer={addAnswer} editAnswer={editAnswer} />
      <Footer />
    </>
  )
}

export default App

