import React from 'react'
import './PayloadProfile.css'
import { useState, useEffect } from 'react'
import {Container,Row,Col,Card, Button} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";



function PayloadProfile() {
const [payloadInfo, setPayloadInfo] = useState();
const [userInfo, setUserInfo] = useState();
// const [payLoadUser, setPayloadUser] = useState()

useEffect(()=> {
    fetch ('http://localhost:8080/table/users')
    .then(res => res.json())
    .then(data => setUserInfo(data))
}, [])
useEffect(()=> {
    fetch ('http://localhost:8080/table/payloads')
    .then(res => res.json())
    .then(data => setPayloadInfo(data))
}, [])
console.log(userInfo)

let customer = userInfo?.filter((e, i) => e.id == 1)
let payloads = payloadInfo?.filter((e,i)=> e.payload_user_id == 1)

console.log(payloads)


  return (
<>

<Container fluid className="App py-2 overflow-hidden">
<Row className="justify-content-center profileRow">
<Col className='profileCol'>
        {customer?.map((user , i) => {
        return (
            
               
                    <Card key={i} className='payloadProfileCard'>
                    <Card.Body>
                        <Card.Title>{user.organization}</Card.Title>
                        <Card.Text>
                        Username: {user.username}
                        </Card.Text>
                        <footer>
                            <small className="text-muted">User Created: {user.updated_at}</small>
                        </footer>
                    </Card.Body>
                    </Card>
                
           
        )})}
        </Col>
 
      
 
    
    <Col xs={6} >
    <Row className='payloadsTitle'><h3>Payloads</h3></Row>
    {payloads?.map((payload, i) => {
           
    return ( 
            <Card >
            <Card.Body className='payloadsCol'>
                <Card.Title>{payload.name}</Card.Title>
                <Card.Text>
                    Status: (soon)
                </Card.Text>
                <footer>
                <small className="text-muted">Payload Created: {payload.updated_at}</small>
                </footer>
            </Card.Body>
            </Card>
      
       
        )})}
        </Col>
        <Col xs lg="2" className='addCol'>
        <Card className='buttonCard'>
            <Card.Body>             
                <Button className='addPayload' variant="outline-primary">+</Button>
                <Card.Title>Add payload</Card.Title>
            </Card.Body>
            </Card>
        </Col>
        </Row>
      
    </Container>
</>
  )
}

export default PayloadProfile