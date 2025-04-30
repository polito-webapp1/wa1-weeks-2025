import { Container, Navbar } from 'react-bootstrap'
import { Button } from "react-bootstrap"
import { Outlet} from "react-router"


function Header(props) {

  return (<>
  <Navbar bg='primary' >
    <Container fluid> <h1 style={{color:'white'}}>Heap Overrun</h1>
    <Button onClick={()=>props.toggleLang()}>{props.lang}</Button>
    </Container>
    
  </Navbar>
  <Outlet/>
  
  </>)
}

export default Header