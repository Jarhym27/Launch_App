import React from 'react'
import './PayloadProfile.css'
import { useState, useEffect } from 'react'
import {Container,Row,Col,Card} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";



function PayloadProfile() {
const [payloadInfo, setPayloadInfo] = useState();

// useEffect(()=> {
//     fetch ('http://')
// })

  return (
<>

<Container fluid className="App py-2 overflow-hidden">
      <Row className="justify-content-center">Some text here</Row>
      <Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
        <Card>
          <Card.Body>
            <Card.Title>Payloads</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
            <footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </footer>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{" "}
            </Card.Text>
            <footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </footer>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
            <footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </footer>
          </Card.Body>
        </Card>
      </Row>
      <Row>There's some text in here too</Row>
    </Container>
</>
  )
}

export default PayloadProfile