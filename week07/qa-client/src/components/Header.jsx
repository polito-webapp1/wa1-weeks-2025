import { Container, Navbar } from 'react-bootstrap'
import { Button } from "react-bootstrap"


function Header(props) {

  return <Navbar bg='primary' >
    <Container fluid> <h1 style={{color:'white'}}>Heap Overrun</h1>
    </Container>
  </Navbar>
}

export default Header