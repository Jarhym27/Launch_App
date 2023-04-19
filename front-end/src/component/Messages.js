import { useState,useContext, useEffect } from "react";
import { RocketInfo } from "../App";
import {Container, Row, Col} from 'react-bootstrap'
import './Messages.css'
const moment = require('moment')


const Messages = ({selectedRequest}) => {

  const messageRef = useRef();

  const [messages,setMessages] = useState(null)
  const { userLogin } = useContext(RocketInfo);

  let recipientID = userLogin.role==='lsp_user' ? selectedRequest.payload_user_id : selectedRequest.lsp_user_id

  const handleSendMessage = () => {
    
    fetch('http://localhost:8080/table/messages',
        {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify({
            sender_id: userLogin.id,
            recipient_id: recipientID,
            launch_request_id: selectedRequest.id,
            message: messageRef.current.value,
            notification_type: "New message",
            notification_ack: 'false'
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(res=>res.json())
        .then(data=>{
          return(fetch(`http://localhost:8080/join/messages-users?launch_request_id=${selectedRequest.id}`))
        })
        .then(res=>res.json())
        .then(data=> {
          messageRef.current.value = ''
          setMessages(data)
          })
  }

  const handleKeyDown = (e) => {
    if(e.key==='Enter' && messageRef.current.value){
      handleSendMessage();
    }
  }

  useEffect(()=> {
    if(!messages) return
    var messageBody = document.querySelector('#messages-container');
    messageBody.scrollTop = messageBody.scrollHeight
  },[messages])


  useEffect(()=> {
    fetch(`http://localhost:8080/join/messages-users?launch_request_id=${selectedRequest.id}`)
      .then(res=>res.json())
      .then(data=> setMessages(data))
  },[selectedRequest.id])


  if(messages){

    return (
      <> 
      <h2>Messages</h2>
    <Container id='messages-container'>
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
              {moment(msg.timestamp).fromNow()}
              </Col>
            </Row>
            <Row className='message-container-me'>
              {msg.notification_type==='Request denied' && 
                <h5 className='message-me'>Request Denied</h5>
              }
              {msg.notification_type==='New request' && 
                <h5 className='message-me'>New Request</h5>
              }
              {msg.notification_type==='Request accepted' && 
                <h5 className='message-me'>Request Accepted</h5>
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
                {moment(msg.timestamp).fromNow()}
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
      <Form onKeyDown={(e)=>handleKeyDown(e)}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>New Message</Form.Label>
        <Form.Control ref={messageRef} as="textarea" rows={4} />
      </Form.Group>
      <Button onClick={()=>handleSendMessage()} variant="primary" type="button">
        Send
      </Button>
    </Form>
    </>
    );
  }

}
 
export default Messages;