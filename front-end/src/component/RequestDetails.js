import { useState,useContext, useEffect } from "react";
import { RocketInfo } from "../App";
import {Container, Row, Col} from 'react-bootstrap'
import Messages from "./Messages";
import './RequestDetails.css'

const RequestDetails = ({selectedRequest}) => {

    return ( 
    <div className='request-details-container'>
      <Container>
          <Row>
            <Col>
            <Row><h2>Request Details</h2></Row>
            <Row>Request Status: {selectedRequest.request_status}</Row>
            <Row>Request Cost: ${selectedRequest.cost} million</Row>
            <Row>Request Initiated: {selectedRequest.created_at}</Row>
            <Row>Launch Provider: {selectedRequest.organization}</Row>
            <Row>Launch Vehicle: {selectedRequest.launch_vehicle}</Row>
            <Row>Location: {selectedRequest.launch_pad} - {selectedRequest.launch_site}</Row>
            <Row>Payload: {selectedRequest.name}</Row>
            <Row>Description: {selectedRequest.description}</Row>
            <Row>Target Orbit: {selectedRequest.orbital_requirement}</Row>
            </Col>
            <Col>
              <Messages selectedRequest={selectedRequest}/>
            </Col>
          </Row>
        </Container>
    </div>
     );
  }
 
export default RequestDetails;