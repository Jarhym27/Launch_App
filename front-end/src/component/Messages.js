import { useState,useContext, useEffect } from "react";
import { RocketInfo } from "../App";
import {Container, Row, Col} from 'react-bootstrap'
import './Messages.css'


const Messages = ({selectedRequest}) => {

  const [messages,setMessages] = useState(null)
  const { userLogin } = useContext(RocketInfo);

  useEffect(()=> {
    fetch(`http://localhost:8080/join/messages-users?launch_request_id=${selectedRequest.id}`)
      .then(res=>res.json())
      .then(data=> setMessages(data))
  },[])


  if(messages){

    return ( 
    <Container>
      <h2>Messages</h2>
      {messages.map(msg=> {

      return msg.sender_id===userLogin.id ? 
      <div key={msg.id}>
        <Row className='justify-content-end'>
          <Col md={7} lg={7}>
            <Row>
              <Col>
                <h5>Me</h5>
              </Col>
              <Col>
                {msg.timestamp}
              </Col>
            </Row>
            <Row className='message-container-me'>
              {msg.notification_type==='Request denied' && 
                <h5>Request Denied</h5>
              }
              {msg.notification_type==='New request' && 
                <h5>New Request</h5>
              }
              {msg.notification_type==='Request accepted' && 
                <h5>Request Accepted</h5>
              }
              <Col>
                <p className='message-me'>{msg.message}</p> 
              </Col>
            </Row>
          </Col>
        </Row>
        <hr></hr>
      </div>
      :
      <div key={msg.id}>
        <Row className='justify-content-start'>
          <Col md={7} lg={7}>
            <Row>
              <Col>
                <h5>{msg.organization}</h5>
              </Col>
              <Col>
                {msg.timestamp}
              </Col>
            </Row>
            <Row className='message-container-them'>
              {msg.notification_type==='Request denied' && 
                <h5>Request Denied</h5>
              }
              {msg.notification_type==='New request' && 
                <h5>New Request</h5>
              }
              {msg.notification_type==='Request accepted' && 
                <h5>Request Accepted</h5>
              }
              <Col>
                <p>{msg.message}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr></hr>
      </div>
      }
      )}
    </Container>
    
    );
  }

}
 
export default Messages;