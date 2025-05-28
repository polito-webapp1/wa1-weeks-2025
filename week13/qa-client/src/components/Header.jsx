import { useEffect, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Button } from "react-bootstrap"
import { Link, Outlet, useLocation } from "react-router"


function Header(props) {

  const [welcome, setWelcome] = useState(true)

  useEffect(() => {
    setTimeout(() => { setWelcome(false) }, 2000)
  }, [] )

  const location = useLocation();


  const islogin = location.pathname === '/login';

  return (<>
    <Navbar bg='primary' >
      <Container fluid><Link to='/'> <h1 style={{ color: 'white' }}>Heap Overrun</h1></Link>
        {!islogin && !props.loggedIn &&
        <Link to={'/login'}>
        <Button >Login</Button>
        </Link>}
        {props.loggedIn && 
        <Button onClick={()=>props.handleLogout()}>
          Logout
        </Button>
        }
        <Button onClick={() => props.toggleLang()}>{props.lang}</Button>
      </Container>


    </Navbar>
    {welcome && <Container fluid>
      <h2>Welcome to the Q&A</h2>
    </Container>}

    <Outlet />

  </>)
}

export default Header