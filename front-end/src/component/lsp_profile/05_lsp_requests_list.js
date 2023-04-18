import React, {useState, useContext, useEffect} from "react";
import {Container,Row,Col,Card, Button} from 'react-bootstrap'
import LaunchRequest from "../LaunchRequest";
import { RocketInfo } from "../../App"
import { Modal } from "react-bootstrap";
import { resolvePath } from "react-router";
import '../../css/lsp_requests_list.css'

const RequestList = () =>{
  const {userLogin, setUserLogin, availablePads, setAvailablePads, launchVehicles, setLaunchVehicles } = useContext(RocketInfo);

  const [myRequests, setMyRequests] = useState([])
  const [myPayloads, setMyPayloads] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [myUsers, setMyUsers] = useState([])
  const [selectedRequest, setSelectedRequest] = useState()
  const [responseMessage, setResponseMessage] = useState('')
  const [decision, setDecision] = useState('')

  useEffect(() =>{
    if(userLogin){
    fetch('http://localhost:8080/join/launch_requests')
      .then(res => res.json())
      .then(data => data.filter(e => e.lsp_user_id == userLogin.id))
      .then(filtered => setMyRequests(filtered))
    }
  },[userLogin])

  useEffect(() => {
    if(myRequests){
      fetch('http://localhost:8080/table/users')
        .then(res => res.json())
        .then(data => data.filter(e => myRequests.map(e => e.payload_user_id).includes(e.id)))
        .then(filtered => setMyUsers(filtered))
    }
  }, [myRequests])

  const respondRequest = () => {
    if(selectedRequest && responseMessage && decision){
      fetch('http://localhost:8080/table/messages', {
      method: "POST",
      body: JSON.stringify({
        sender_id: userLogin.id, //user id of who's sending
        recipient_id: selectedRequest.payload_user_id, //user id of recipient
        launch_request_id: selectedRequest.id, //launch request associated with the event
        message: responseMessage, // message content
        notification_type: decision === "deny" ? "Request denied" : "Request accepted", //"Request denied" or "Request accepted"
        notification_ack: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      })
        .then(res=> res.json())
        .then(data=>console.log(data))
        .catch(err=>console.error(err))
    }
  }


return(
  <Col className="col-start-9 col-end-12">
  {myUsers?.map((user, i) => {
    return(
    <Card key={i}>
    <Card.Body>
      <Card.Title border="danger">
      Launch Requests from {user.organization} 
      </Card.Title>
      {myRequests?.map((e, i) => {
        if(e.payload_user_id == user.id){
          return(
            <div className="border" key={`request: ${i}`}>
              <p>
                Launch Date: {e.launch_date}<br/>
                Launch Site: {e.launch_site}<br/>
                Launch Vehicle: {e.launch_vehicle}<br/>
                Payload: {e.name}<br/>
                Orbit: {e.orbital_requirement}<br/>
                Weight: {e.weight} Tons<br/>
                Request Status: {e.request_status}<br/>
              </p>
              <button className="btn" onClick={() => {setDecision('approve'); setSelectedRequest(e)}}>Approve</button>
              <button className="btn" onClick={() => {setDecision('deny'); setSelectedRequest(e)}}>Deny</button>
            </div>
          )
        }
      })}
    </Card.Body>
    </Card>
  )
    
  }
  
  )}

    <Modal show={decision} onHide={() => {setDecision(''); setResponseMessage('')}}>
      <Modal.Header closeButton>
        <Modal.Title>Payload Request Response: {decision.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea id="paraBox" rows="2" cols="25" placeholder="Enter your response message here"   onChange={(e) => setResponseMessage(e.target.value)}></textarea>
      </Modal.Body>
      <Modal.Footer>
        <button disabled={!responseMessage} onClick={() => respondRequest()}>Submit Decision</button>
      </Modal.Footer>
    </Modal>
  
  </Col>
)}

export default RequestList;