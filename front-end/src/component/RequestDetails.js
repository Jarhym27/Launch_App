import { Container, Row, Col } from 'react-bootstrap'
import Messages from "./Messages";
import './RequestDetails.css'
import { useLocation } from "react-router";
import Card from 'react-bootstrap/Card'

const RequestDetails = () => {
  const location = useLocation();

  return (
    <div className='request-details-container'>
      <Container>
        <Row className='mt-3'>
          <Col md={5} lg={5} className='mx-5'>
          <Card className='request-details-card'>
            <Row><h2>Request Details</h2></Row>
            <Row><p>Request Status: {location.state.request_status}</p></Row>
            <Row><p>Request Cost: ${location.state.cost} million</p></Row>
            <Row><p>Request Initiated: {location.state.created_at}</p></Row>
            <Row><p>Launch Provider: {location.state.organization}</p></Row>
            <Row><p>Launch Vehicle: {location.state.launch_vehicle}</p></Row>
            <Row><p>Location: {location.state.launch_pad} - {location.state.launch_site}</p></Row>
            <Row><p>Payload: {location.state.name}</p></Row>
            <Row><p>Description: {location.state.description}</p></Row>
            <Row><p>Target Orbit: {location.state.orbital_requirement}</p></Row>
            <Row><p>Launch Date: {location.state.launch_date}</p></Row>
          </Card>
          </Col>
          <Col md={5} lg={5}>
            <Card className='request-details-card'>
              <Messages selectedRequest={location.state} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RequestDetails;