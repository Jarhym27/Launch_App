import React, {useState, useContext, useEffect} from "react";
import { LspDistro } from "./01_lsp_profile_page";
import {Container,Row,Col,Card, Button} from 'react-bootstrap'
import LaunchRequest from "../LaunchRequest";
import { RocketInfo } from "../../App"

const RequestList = () =>{
  const { userLogin, setUserLogin } = useContext(RocketInfo);

  const {launchRequest, setLaunchRequest,lspUser,setLspUser} = useContext(LspDistro)

  useEffect(() =>{
    fetch('http://localhost:8080/table/users')
    .then(res => res.json())
    .then(data => setLspUser(data))
  },[])
  useEffect(() =>{
  fetch('http://localhost:8080/join/launch_requests')
  .then(res => res.json())
  .then(data => setLaunchRequest(data))
},[])

console.log(launchRequest)

let currentCustomer = lspUser?.filter(element => element.role !== 'lsp_user')

return(
<Row>
  <Col className="col-start-9 col-end-12">
    {userLogin.username}
  {currentCustomer?.map((user, i) => {
    return(
    <Card key={i}>
    <Card.Body>
      <Card.Title border="danger">
      Launch Requests for {user.username} 
      </Card.Title>
      <br />
      <div>launch request 002</div>
      <div>launch request 003</div>
    </Card.Body>
    </Card>
  )
    
  }
  
  )}
  
  </Col>
  </Row>
)}

export default RequestList;