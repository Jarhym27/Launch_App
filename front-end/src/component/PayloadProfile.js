import React from 'react'
import './PayloadProfile.css'
import { useState, useEffect } from 'react'
import {Container,Row,Col,Card, Button} from 'react-bootstrap'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";



function PayloadProfile() {
const [payloadInfo, setPayloadInfo] = useState();
const [userInfo, setUserInfo] = useState();

//PAYLOADS USESTATES 
const [weight, setWeight] = useState();
const [orbit, setOrbit] = useState();
const [name, setName] = useState();
// PAYLOADS USESTATES

//ADD BUTTON PAYLOAD USESTATES 
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
//ADD BUTTON PAYLOAD USESTATES 



useEffect(()=> {
    fetch ('http://localhost:8080/table/users')
    .then(res => res.json())
    .then(data => setUserInfo(data))
}, [])
useEffect(()=> {
    fetch ('http://localhost:8080/join/launch_requests')
    .then(res => res.json())
    .then(data => setPayloadInfo(data))
}, [])
console.log(userInfo)

let customer = userInfo?.filter((e, i) => e.id == 1)
let payloads = payloadInfo?.filter((e,i)=> e.payload_user_id == 1)

// ADD PAYLOAD POST 
const handlePost= (e) => {
    e.preventDefault(); 

    fetch('http://localhost:8080/payloads/:payloads', {
        method: "POST", 
        body: JSON.stringify({
            weight: weight, 
             orbit: orbit, 
             name:name
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(()=> 
        fetch('http://localhost:8080/join/launch_requests')
        .then(res => res.json())
        .then(data => setPayloadInfo(data))
        )
    
}
//ADD PAYLOAD BUTTON
    const handleAddButton = (e) =>{

    } 
//ADD PAYLOAD BUTTON
console.log('here',payloads)

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
                            <small>User Created: {user.updated_at}</small>
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
                    Status: {payload.request_status}
                </Card.Text>
                <footer>
                    <small >Payload Created: {payload.updated_at}</small>
                </footer>
            </Card.Body>
            </Card>
      
       
        )})}
        </Col>
        <Col xs lg="2" className='addCol'>
        <Card className='buttonCard'>
            <Card.Body>             
                <Button className='addPayload' variant="outline-primary" onClick={handleShow}>
                    +
                </Button>
                <Card.Title>Add payload</Card.Title>
            </Card.Body>
            </Card>
        </Col>
        </Row>
      
    </Container>

      <Modal show={show} onHide={handleClose} className='buttonCard'>
        <Modal.Header closeButton>
          <Modal.Title>Add Payload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Payload Name</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Weight</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Orbit</Form.Label>
              <Form.Select >
                <option>GEO</option>
                <option>HEO</option>
                <option>LEO</option>
                <option>MEO</option>
            </Form.Select>
            </Form.Group>
   
          </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className='addPayload' variant="primary" type="submit">
                Add
            </Button>
            <Button className='addPayload' variant="secondary" onClick={handleClose}>
                Cancel
            </Button>

            </Modal.Footer>
      </Modal>
</>
  )
}

export default PayloadProfile