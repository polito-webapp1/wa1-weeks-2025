import { useEffect, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Button } from "react-bootstrap"
import { Link, Outlet } from "react-router"


function Header(props) {

  const [welcome, setWelcome] = useState(true)

  useEffect(() => {
    setTimeout(() => { setWelcome(false) }, 2000)
  }, [] )

  return (<>
    <Navbar bg='primary' >
      <Container fluid><Link to='/'> <h1 style={{ color: 'white' }}>Heap Overrun</h1></Link>
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