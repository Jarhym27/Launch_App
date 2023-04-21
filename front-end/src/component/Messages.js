import { useState, useContext, useEffect, useRef } from "react";
import { RocketInfo } from "../App";
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './Messages.css'
import {AiOutlineSend} from 'react-icons/ai'
const moment = require('moment')


const Messages = ({ selectedRequest }) => {

  const messageRef = useRef();

  const [messages, setMessages] = useState(null)
  const { userLogin } = useContext(RocketInfo);
  const [recipient, setRecipient] = useState(null)

  let recipientID = userLogin.role === 'lsp_user' ? selectedRequest.payload_user_id : selectedRequest.lsp_user_id

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
      .then(res => res.json())
      .then(data => {
        return (fetch(`http://localhost:8080/join/messages-users?launch_request_id=${selectedRequest.id}`))
      })
      .then(res => res.json())
      .then(data => {
        messageRef.current.value = ''
        setMessages(data)
      })
  }

  useEffect(() => {
    fetch('http://localhost:8080/table/users')
      .then(res => res.json())
      .then(data => {
        let otherEnd = data.filter(user => user.id === recipientID)
        setRecipient(otherEnd)
      })
  }, [selectedRequest])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && messageRef.current.value) {
      handleSendMessage();
    }
  }

  useEffect(() => {
    if (!messages) return
    var messageBody = document.querySelector('#messages-container');
    messageBody.scrollTop = messageBody.scrollHeight
  }, [messages])


  useEffect(() => {
    fetch(`http://localhost:8080/join/messages-users?launch_request_id=${selectedRequest.id}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data)
      })
  }, [selectedRequest.id])


  if (messages) {

    return (
      <>
        {recipient && <h6>Conversation with {recipient[0].organization}</h6>}
        <hr></hr>
        <Container id='messages-container'>
          {messages.map(msg => {
            return msg.sender_id === userLogin.id ?
              <div key={msg.id}>
                <Row className='justify-content-end'>
                  <Col md={7} lg={7}>
                    <Row>
                      <Col>
                        <h5>Me</h5>
                      </Col>
                      <Col className='p-0 m-0'>
                        <span className='moment-text'>{moment(msg.timestamp).fromNow()}</span>
                      </Col>
                    </Row>
                    <Row className='message-container-me'>
                      {msg.notification_type === 'Request denied' &&
                        <h5 className='message-me'>Request Denied</h5>
                      }
                      {msg.notification_type === 'New request' &&
                        <h5 className='message-me'>New Request</h5>
                      }
                      {msg.notification_type === 'Request accepted' &&
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
                      <Col className='p-0 m-0'>
                        <span className='moment-text'>{moment(msg.timestamp).fromNow()}</span>
                      </Col>
                    </Row>
                    <Row className='message-container-them'>
                      {msg.notification_type === 'Request denied' &&
                        <h5>Request Denied</h5>
                      }
                      {msg.notification_type === 'New request' &&
                        <h5>New Request</h5>
                      }
                      {msg.notification_type === 'Request accepted' &&
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
        <Form onKeyDown={(e) => handleKeyDown(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label><h6>New Message</h6></Form.Label>
            <Form.Control ref={messageRef} as="textarea" rows={4} />
          </Form.Group>
          <Row>
            <Col className='d-flex justify-content-end'>
            <Button className='send-btn' onClick={() => handleSendMessage()} type="button">
              <Row>
                <Col >
                Send
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                <AiOutlineSend className='send-icon'/>
                </Col>
              </Row>
            </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }

}

export default Messages;