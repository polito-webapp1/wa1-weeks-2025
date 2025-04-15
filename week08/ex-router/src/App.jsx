import { Container } from 'react-bootstrap'
import { Routes, Route, Link, useNavigate, useParams, Outlet } from 'react-router'
import { Button } from 'react-bootstrap'

function App() {

  const [questions, setQuestions] = useState()

  return (
    <Container>
      <h1><Link to='/'>Ciao</Link></h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/main' element={<Main/>}>
          <Route path='questions' element={<Questions />} />
          <Route path='answers/:question_id' element={<Answers />} />
        </Route>
        <Route path='/about' element={<About />} />
      </Routes>
    </Container>
  )
}

function Home() {

  const navigate = useNavigate()

  const goToQuestions = () => {
    navigate('/main/questions')
  }

  return <>
    <h2>Home page</h2>
    <p>Go to the list of questions: <Button onClick={goToQuestions}>Go</Button></p>
    <p>see <Link to='/about'>who we are</Link></p>
  </>
}

function Main() {
  return <>
  <h1>MAIN</h1>
  <Outlet/>
  </>
}

function Questions() {
  return <>
    <h2>Questions</h2>
    <ul>
      <li><Link to='/main/answers/1'>Question one</Link></li>
      <li><Link to='/main/answers/2'>Question two</Link></li>
      <li><Link to='/main/answers/3'>Last Question</Link></li>
    </ul>
  </>
}

function Answers() {
  const { question_id } = useParams()

  return <h2>Answers to question number {question_id}</h2>
}




function About() {
  return <p>we are the best</p>
}

export default App
