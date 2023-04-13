import { Container,Row,Col } from "react-bootstrap";
import './Home.css'
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import {RocketTakeoffFill} from "react-bootstrap-icons";
import {GiMoonOrbit} from 'react-icons/gi'
import {GiEarthAmerica} from 'react-icons/gi'
import {CgBorderStyleDashed} from 'react-icons/cg'
import { useRef } from "react";

const Home = () => {

  const locationRef = useRef(null);
  const launchProviderRef = useRef(null);
  const orbitRef = useRef(null);

  return ( 
    <div className='home-container'>
      <Container>
        <Row className='py-5'>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title className='card-title'>Where can we pick you up?</Card.Title>
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
                <InputGroup className="py-2">
                  <InputGroup.Text id="basic-addon1"><GiEarthAmerica/></InputGroup.Text>
                  <Form.Control 
                    ref={locationRef}
                    placeholder="Launch Location"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <CgBorderStyleDashed className='line-dash'/>
                <InputGroup className="py-2">
                  <InputGroup.Text id="basic-addon1"><RocketTakeoffFill/></InputGroup.Text>
                  <Form.Control
                    ref={launchProviderRef}
                    placeholder="Launch Provider"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <CgBorderStyleDashed className='line-dash'/>
                <InputGroup className="py-2">
                  <InputGroup.Text id="basic-addon1"><GiMoonOrbit/></InputGroup.Text>
                  <Form.Control
                    ref={orbitRef}
                    placeholder="Desired Orbit"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <h1>Still a work in progress 😊</h1>
      </Container>
    </div>
  );
}
 
export default Home;