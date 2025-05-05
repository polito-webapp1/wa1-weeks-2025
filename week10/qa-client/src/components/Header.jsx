import { Container, Navbar } from 'react-bootstrap'
import { Button } from "react-bootstrap"
import { Link, Outlet} from "react-router"


function Header(props) {

  return (<>
  <Navbar bg='primary' >
    <Container fluid><Link to='/'> <h1 style={{color:'white'}}>Heap Overrun</h1></Link>
    <Button onClick={()=>props.toggleLang()}>{props.lang}</Button>
    </Container>
    
  </Navbar>
  <Outlet/>
  
  </>)
}

export default Header