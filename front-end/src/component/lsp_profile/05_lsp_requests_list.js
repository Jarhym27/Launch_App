import React, {useState, useContext, useEffect} from "react";
import { LspDistro } from "./01_lsp_profile_page";
import {Container,Row,Col,Card, Button} from 'react-bootstrap'
import LaunchRequest from "../LaunchRequest";
import { RocketInfo } from "../../App"

const RequestList = () =>{
  const { userLogin, setUserLogin } = useContext(RocketInfo);

  const {launchRequest, setLaunchRequest,lspUser,setLspUser} = useContext(LspDistro)

  const [launchVehicle, setLaunchVehicle] = useState([])

  // useEffect(() =>{
  //   fetch('http://localhost:8080/table/launch_vehicles')
  //   .then(res => res.json())
  //   .then(data => {
  //     data = data.filter(element => element.lsp_user_id === userLogin.id)
  //     setLaunchVehicle(data)
  //     fetch('http://localhost:8080/join/launch_requests')
  //     .then(res => res.json())
  //     .then(data => {
  //       let rocketIDs = launchVehicle.map(e => e.id)
  //       data = data.filter(element => rocketIDs.includes(element.launch_vehicle_id))
  //       setLaunchRequest(data)
  //       console.log(data)
  //     })
  //   })
  //   .then(() => {
  //     fetch('http://localhost:8080/table/users')
  //     .then(res => res.json())
  //     .then(data => {
  //       let activeUsers = launchRequest.map(e => e.payload_user_id)
  //       setLspUser(data.filter(element => element.role !== 'lsp_user' && activeUsers.includes(element.id)))
  //     })  
  //   })
  // },[])


return(
<Row>
  <Col className="col-start-9 col-end-12">
    {userLogin.username}
  {lspUser?.map((user, i) => {
    return(
    <Card key={i}>
    <Card.Body>
      <Card.Title border="danger">
      Launch Requests from {user.username} 
      </Card.Title>
      {launchRequest?.map((e, i) => {
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