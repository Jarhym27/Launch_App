import React, {useState, useContext, useEffect} from "react";
import {Container,Row,Col,Card, Button} from 'react-bootstrap'
import LaunchRequest from "../LaunchRequest";
import { RocketInfo } from "../../App"
import { resolvePath } from "react-router";

const RequestList = () =>{
  const {userLogin, setUserLogin, availablePads, setAvailablePads, launchVehicles, setLaunchVehicles } = useContext(RocketInfo);

  const [myRequests, setMyRequests] = useState([])
  const [myPayloads, setMyPayloads] = useState([])
  const [myUsers, setMyUsers] = useState([])

  useEffect(() =>{
    fetch('http://localhost:8080/join/launch_requests')
      .then(res => res.json())
      .then(data => data.filter(e => e.lsp_user_id == userLogin.id))
      .then(filtered => setMyRequests(filtered))
  },[userLogin])

  useEffect(() => {
    fetch('http://localhost:8080/table/users')
      .then(res => res.json())
      .then(data => data.filter(e => myRequests.map(e => e.payload_user_id).includes(e.id)))
      .then(filtered => setMyUsers(filtered))
  }, [myRequests])



return(
<Row>
  <Col className="">
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
            <div className="border">
              <p>
                Launch Date: {e.launch_date}<br/>
                Launch Site: {e.launch_site}<br/>
                Launch Vehicle: {e.launch_vehicle}<br/>
                Payload: {e.name}<br/>
                Orbit: {e.orbital_requirement}<br/>
                Weight: {e.weight} Tons<br/>
                Request Status: {e.request_status}<br/>
                

              </p>
            </div>
          )
        }
      })}
    </Card.Body>
    </Card>
  )
    
  }
  
  )}
  
  </Col>
  </Row>
)}

export default RequestList;