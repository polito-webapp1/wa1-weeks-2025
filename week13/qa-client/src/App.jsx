import Header from './components/Header'
import Footer from './components/Footer'
import QuestionDisplay from './components/Question'
import AnswersDisplay from './components/Answer'
import ListQuestions from './components/ListQuestions'
import { Question, Answer } from './models/QAModels.mjs'
import LoginForm from './components/LoginForm.jsx'
import AddEditAnswerForm_Uncontrolled from './components/AnswerForm'
import { loadQuestions, logIn, logout } from './API/API.js'


import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'

import LanguageContext from './components/LanguageContext'
import { Routes, Route, Navigate } from 'react-router'


function App() {


  // Context state
  const [lang, setLang] = useState('en')
  // useState({ lang: 'en', toggle : toggleLang})

  // Application state
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('')

  // Load the list of questions at application startup
  useEffect(() => {
    setMessage('')
    setLoading(true)
    loadQuestions().then((dataLoaded) => {
      setQuestions(dataLoaded)
      setLoading(false)
    }).catch((ex) => {
      console.log("<App> received error:" + ex)
      setMessage('Loading error... please try again')
    })
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const loginUser = await logIn(credentials);
      console.log(loginUser)
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${loginUser.name}!`, type: 'success' });
      setUser(loginUser);
    } catch (err) {
      setMessage({ msg: err, type: 'danger' })
    }

  }

  const handleLogout = async () => {
    await logout();
    setLoggedIn(false);
    setMessage('');
  }

  // Handler function for mananging the language
  const toggleLang = () => {
    setLang(oldLang => oldLang == 'en' ? 'it' : 'en')
  }



  useEffect(() => {
    if (message && message.msg) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  



  return (
    <>
      <LanguageContext.Provider value={lang}>
        {/* alternative: { lang: lang, toggle : toggleLang} */}

        {message && message.msg && <div className={`alert alert-${message.type}`}>{message.msg}</div>}


        {loading ? (
          <div>...page loading...</div>
        ) :
          <Routes>
            <Route path="/" element={<Header lang={lang} toggleLang={toggleLang} loggedIn={loggedIn} handleLogout={handleLogout} />}>

              <Route index element={<ListQuestions questions={questions} user={user} loggedIn={loggedIn} />} />

              <Route path="login" element={loggedIn ? <Navigate replace to='/' /> : <LoginForm handleLogin={handleLogin} />} />
              <Route path="asked-questions" element={<ListQuestions questions={questions} user={user} loggedIn={loggedIn} />} />
              <Route path="question/:qid" element={
                <>
                  <QuestionDisplay questions={questions} />
                  <AnswersDisplay user={user} loggedIn={loggedIn}
                  />
                  <Footer />
                </>
              } >

              </Route>
              <Route path="question/:qid/add" element={<AddEditAnswerForm_Uncontrolled user={user}
              /* addAnswer={addAnswer} */
              />} />
              <Route path="question/:qid/edit/:aid" element={<AddEditAnswerForm_Uncontrolled user={user}
              /* addAnswer={addAnswer} editAnswer={editAnswer} answers={answers}*/ />} />

            </Route>
            <Route path="*" element={<h1>404 Page Not Found</h1>} />
          </Routes>}

      </LanguageContext.Provider>
    </>
  )
}



export default App

