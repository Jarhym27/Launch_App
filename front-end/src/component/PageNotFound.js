import './PageNotFound.css'
import { Link } from 'react-router-dom';
import { Container,Row,Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import AnimeRocket from './Animated_Rocket';

const PageNotFound = () => {
  return (
    <div className='pagenotfound-container'>
      <Container fluid>
        <Row className='justify-content-center'>
          <Col >
            <h1 className='white-text'>404</h1>
            <h2  className='white-text'>Page Not Found</h2>
        <h2 className='white-text'>Sorry, we can't find the page you're looking for.</h2>
          </Col>
        </Row>
        <Row>
        
           <AnimeRocket size={300}/>
          </Row>
        <Button className='home-btn'><Link className='link-home' to='/home'>Home</Link></Button>
      </Container>
    </div>
  );
}

export default PageNotFound