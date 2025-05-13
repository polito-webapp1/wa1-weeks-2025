import Header from './components/Header'
import Footer from './components/Footer'
import QuestionDisplay from './components/Question'
import AnswersDisplay from './components/Answer'
import ListQuestions from './components/ListQuestions'
import { Question, Answer } from './models/QAModels.mjs'
import AddEditAnswerForm_Uncontrolled from './components/AnswerForm'
import { loadQuestions } from './API/API.js'


import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'

import LanguageContext from './components/LanguageContext'
import { Routes, Route, useNavigate } from 'react-router'


function App() {


  const fakeAnswers = []
  fakeAnswers.push(new Answer(10, 'ok', 'a@b.com', 100, '2025-04-01'))
  fakeAnswers.push(new Answer(11, 'it crashes', 'c@b.com', 101, '2025-03-31'))

  // We use a fake logged user ID to simulate the logged user so that when we click on the Asked Questions
  // we can filter the questions by the logged user
  const fakeLoggedUser = 24

  // Context state
  const [lang, setLang] = useState('en')
  // useState({ lang: 'en', toggle : toggleLang})

  // Application state
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  // Load the list of questions at application startup
  useEffect(() => {
    setErrMsg('')
    setLoading(true)
    loadQuestions().then((dataLoaded) => {
      setQuestions(dataLoaded)
      setLoading(false)
    }).catch((ex)=>{
      console.log("<App> received error:" + ex)
      setErrMsg('Loading error... please try again')
    })
  }, [])

  //hook to navigate between pages
  const navigate = useNavigate();


  // Handler function for mananging the language
  const toggleLang = () => {
    setLang(oldLang => oldLang == 'en' ? 'it' : 'en')
  }

/*
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
      const newId = Math.max(...prevAnswers.map(a => a.id)) + 1
      return [...prevAnswers, { ...ans, id: newId }]
    })
  }

  const editAnswer = (ans) => {
    // console.log(ans)
    setAnswers((prevAnswers) => prevAnswers.map((a) => a.id != ans.id ? a : ans))
  }
*/
  // const answersActions = { editAnswer, addAnswer, upVote, delAnswer }
  // we could store the different actions into one object, so that it's easier to pass down
  // and used like props.actions.editAnswer

  return (
    <>
      <LanguageContext.Provider value={lang}>
        {/* alternative: { lang: lang, toggle : toggleLang} */}

        {errMsg && <div >{errMsg}</div>}
        {loading && <div>...page loading...</div>}

        {!errMsg && !loading && <Routes>
          <Route path="/" element={<Header lang={lang} toggleLang={toggleLang} />}>
            <Route index element={<ListQuestions questions={questions} />} />
            {/* We add another route that will display the questions asked by the fake logged user */}
            <Route path="asked-questions" element={<ListQuestions questions={questions} loggedUser={fakeLoggedUser} />} />
            <Route path="question/:qid" element={
              <>
                <QuestionDisplay questions={questions} />
                <AnswersDisplay
                  /* answers={answers}
                  delAnswer={delAnswer}
                  upVote={upVote}
                  addAnswer={addAnswer}
                  editAnswer={editAnswer} */
                />
                <Footer />
              </>
            } >

            </Route>
            <Route path="question/:qid/add" element={<AddEditAnswerForm_Uncontrolled
              /* addAnswer={addAnswer} */
            />} />
            <Route path="question/:qid/edit/:aid" element={<AddEditAnswerForm_Uncontrolled
              /* addAnswer={addAnswer} editAnswer={editAnswer} answers={answers}*/ />} />

          </Route>
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>}

      </LanguageContext.Provider>
    </>
  )
}

{/*
  <Header lang={lang} toggleLang={toggleLang} />
        
*/}

export default App

