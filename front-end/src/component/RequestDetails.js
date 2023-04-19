import {Container, Row, Col} from 'react-bootstrap'
import Messages from "./Messages";
import './RequestDetails.css'
import { useLocation } from "react-router";

const RequestDetails = () => {
    const location = useLocation();

    return ( 
    <div className='request-details-container'>
      <Container>
          <Row>
            <Col>
            <Row><h2>Request Details</h2></Row>
            <Row>Request Status: {location.state.request_status}</Row>
            <Row>Request Cost: ${location.state.cost} million</Row>
            <Row>Request Initiated: {location.state.created_at}</Row>
            <Row>Launch Provider: {location.state.organization}</Row>
            <Row>Launch Vehicle: {location.state.launch_vehicle}</Row>
            <Row>Location: {location.state.launch_pad} - {location.state.launch_site}</Row>
            <Row>Payload: {location.state.name}</Row>
            <Row>Description: {location.state.description}</Row>
            <Row>Target Orbit: {location.state.orbital_requirement}</Row>
            <Row>Launch Date: {location.state.launch_date}</Row>
            </Col>
            <Col>
              <Messages selectedRequest={location.state}/>
            </Col>
          </Row>
        </Container>
    </div>
     );
  }
 
export default RequestDetails;