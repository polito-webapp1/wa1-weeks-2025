import { Container, Navbar } from 'react-bootstrap'
import { Button } from "react-bootstrap"


function Header(props) {

    return <Container fluid>
      <Navbar>
      <h1>Heap Overrun   
        <Button onClick={()=>{props.increaseLikes()}}>Like</Button>

      </h1>
      </Navbar>
    </Container>
  }

export default Header