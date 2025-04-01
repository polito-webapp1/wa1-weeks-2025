import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import QuestionDisplay from './components/Question'
import AnswersDisplay from './components/Answer' 
import { Question, Answer } from './models/QAModels.mjs'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'

function App() {

  const [likes, setLikes] = useState(0)

  const increaseLikes = () => { 
    setLikes( likes => likes + 1 ) 
  }


  const fakeQuestion = new Question(1, 'how are you?', 'me@mail.com', 24, '2025-04-01')
  const fakeAnswers = []
  fakeAnswers.push( new Answer(10, 'ok', 'a@b.com', 100, '2025-04-01') )
  fakeAnswers.push( new Answer(11, 'it crashes', 'c@b.com', 101, '2025-03-31') )

  return (
    <>
      <Header increaseLikes={increaseLikes}/>
      <QuestionDisplay  question={fakeQuestion}/>
      <AnswersDisplay answers={fakeAnswers}/> 
      <Footer likes={likes}/>
    </>
  )
}



export default App
