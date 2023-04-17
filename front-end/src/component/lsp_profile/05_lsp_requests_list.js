import React, {useState, useContext, useEffect} from "react";
import { LspDistro } from "./01_lsp_profile_page";
import {Container,Row,Col,Card, Button} from 'react-bootstrap'
import LaunchRequest from "../LaunchRequest";
import { RocketInfo } from "../../App"

const RequestList = () =>{
  const { userLogin, setUserLogin } = useContext(RocketInfo);

  const {launchVehicles, launchPads,  payloadUsers,  launchRequests} = useContext(LspDistro)

  const [myRequests, setMyRequests] = useState([])
  const [myVehicles, setMyVehicles] = useState([])
  const [myPayloads, setMyPayloads] = useState([])
  const [myUsers, setMyUsers] = useState([])

  useEffect(() =>{
    // setMyVehicles(launchVehicles.filter(e => e.lsp_user_id === userLogin.id))
    // console.log(launchRequests);
    // .then(() => {
    //   fetch('http://localhost:8080/table/users')
    //   .then(res => res.json())
    //   .then(async data => {
    //     await setActiveUsers(launchRequest.map(e => e.payload_user_id))
    //     setLspUser(data.filter(element => element.role !== 'lsp_user' && activeUsers.includes(element.id)))
    //   })  
    // })
    
  },[launchVehicles, launchPads,  payloadUsers,  launchRequests, userLogin])
  useEffect(() => {
    setMyRequests(launchRequests?.filter(e => launchVehicles.filter(e => e.lsp_user_id === userLogin.id)?.map(e => e.id).includes(e.launch_vehicle_id)))
    console.log('my requests', myRequests)
  }, [myVehicles, launchRequests])
  useEffect(() => {
    
  }, [myRequests])


return(
<Row>
  <Col className="col-start-9 col-end-12">
  {/* {activeUsers?.map((user, i) => {
    return(
    <Card key={i}>
    <Card.Body>
      <Card.Title border="danger">
      Launch Requests from {user.username} 
      </Card.Title>
      {launchRequests?.map((e, i) => {
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
  
  )} */}
  
  </Col>
  </Row>
)}

export default RequestList;