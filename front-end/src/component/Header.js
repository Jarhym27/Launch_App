import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import * as Icon from "react-bootstrap-icons";



const Header = () =>{



return(
  <Navbar bg="dark" expand="lg">
    <Container>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <ul className="flex">
  <li className="mr-6">
    {/* <Icon iconName="BsFillRocketTakeoffFill"/> */}
    <a className="text-blue-500 hover:text-blue-800" href="#">Active</a>
  </li>
  <li className="mr-6">
    <a className="text-blue-500 hover:text-blue-800" href="#">Sign up</a>
  </li>
  <li className="mr-6">
    <a className="text-blue-500 hover:text-blue-800" href="#">Home</a>
  </li>
  <li className="mr-6">
    <a className="text-gray-400 cursor-not-allowed" href="#">Disabled</a>
  </li>
</ul>
</nav>
 </Container>
</Navbar>

)

}

export default Header;