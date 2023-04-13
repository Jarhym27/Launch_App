import React from 'react'
import './PayloadProfile.css'
import { useState, useEffect } from 'react'
import {Container,Row,Col,Card, Button} from 'react-bootstrap'
import { Routes, Route, Switch, Link } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import LaunchRequest from './LaunchRequest.js';



function PayloadProfile() {
const [submittedPayloads, setSubmittedPayloads] = useState();
const [userInfo, setUserInfo] = useState();
const [userPayloads, setUserPayloads ] = useState();

//PAYLOADS USESTATES
const [weight, setWeight] = useState();
const [orbit, setOrbit] = useState();
const [name, setName] = useState();
const [userID, setUserID] = useState();
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
    .then(data => setSubmittedPayloads(data))
}, [userPayloads])
useEffect(()=> {
    fetch ('http://localhost:8080/table/payloads')
    .then(res => res.json())
    .then(data => setUserPayloads(data))
}, [])


let customer = userInfo?.filter((e, i) => e.id == 1)
let payloads = submittedPayloads?.filter((e,i)=> e.payload_user_id == 1)
let newPayloads = userPayloads?.filter((e,i) => e.payload_user_id ==1)

// console.log('here', newPayloads)
// ADD PAYLOAD POST
const handlePost= (e) => {

    fetch('http://localhost:8080/table/payloads', {
        method: "POST",
        body: JSON.stringify({
            payload_user_id: customer[0].id,
            weight: weight,
            orbital_requirement: orbit,
            name:name
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(()=>
        fetch('http://localhost:8080/table/payloads')
        .then(res => res.json())
        .then(data => setUserPayloads(data))
        )
}

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
      <Row>
        <Col className='createdPayloads'><h3>Created Payloads(Not Submitted):</h3>
        {newPayloads?.map((pay , i) => {
         if(pay.id > 40){
        return (
            <>
            <Card >
            <Card.Body className='createdPayloadsCol'>
                <Card.Title>{pay.name}</Card.Title>
                <Card.Text>
                    Status: None, <Link to={`/request/${pay.id}`} state={pay}>click here to book a launch</Link>
                </Card.Text>
                <footer>
                    <small >Payload Created: {pay.updated_at}</small>
                </footer>
            </Card.Body>
            </Card>
            {/* <Routes>
            <Route path={`/payload-${pay.id}/request`} element={<LaunchRequest payload={pay}/>}></Route>
            </Routes> */}
            </>
        )}})}</Col>
      </Row>
    </Container>



      <Modal show={show} onHide={handleClose} className='modalBg'>
        <Modal.Header closeButton className='modalForm'>
          <Modal.Title>Add Payload</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalForm'>
          <Form onSubmit={(e) => {e.preventDefault(); handlePost(); setSubmittedPayloads()}}>
            <Form.Group onChange={(e) => setName(e.target.value)} className="mb-3" controlId="formBasicEmail">
              <Form.Label>Payload Name</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group onChange={(e) => setWeight(e.target.value)} className="mb-3" controlId="formBasicPassword">
              <Form.Label>Weight</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Orbit</Form.Label>
              <Form.Select onChange={(e) => setOrbit(e.target.value)}>
                <option>GEO</option>
                <option>HEO</option>
                <option>LEO</option>
                <option>MEO</option>
            </Form.Select>
            </Form.Group>
            <Button onClick={handleClose} className='addPayload' variant="primary" type="submit">
                Add
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className='modalForm'>
            <Button className='addPayload' variant="secondary" onClick={handleClose}>
                Cancel
            </Button>

            </Modal.Footer>
      </Modal>
</>
  )
}

export default PayloadProfile