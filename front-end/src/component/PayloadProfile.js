import React from 'react'
import './PayloadProfile.css'
import { useState, useEffect } from 'react'
import {Container,Row,Col,Card} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";



function PayloadProfile() {
const [payloadInfo, setPayloadInfo] = useState();
const [userInfo, setUserInfo] = useState();
const [payLoadUser, setPayloadUser] = useState()

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
console.log(payloadInfo)

let customer = userInfo?.filter((e, i) => e.role == 'payload_user')


  return (
<>

<Container fluid className="App py-2 overflow-hidden">
      <Row className="justify-content-center">
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
      </Row>
      <Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
        {payloadInfo?.map((payload, i) => {
return ( 
        <Card>
          <Card.Body>
            <Card.Title>Payload Name (Needs seeding)</Card.Title>
            <Card.Text>
                Status: (soon)
            </Card.Text>
            <footer>
              <small className="text-muted">Payload Created: {payload.updated_at}</small>
            </footer>
          </Card.Body>
        </Card>
        )})}
      </Row>
    </Container>
</>
  )
}

export default PayloadProfile