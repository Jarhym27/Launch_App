import { useState, useContext, useEffect } from "react";
import { RocketInfo } from "../App";
import { Container, Row, Col, ListGroupItem } from 'react-bootstrap'
import './AllMessages.css'
import { Link } from 'react-router-dom';
import { ListGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";
import {Badge} from "react-bootstrap";

const AllMessages = () => {

  const [feeds, setFeeds] = useState(null)
  const { userLogin } = useContext(RocketInfo);


  useEffect(() => {
    fetch(`http://localhost:8080/join/launch_requests-messages`)
      .then(res => res.json())
      .then(data => {
        let myFeeds = data.filter(request => request.sender_id === userLogin.id || request.recipient_id === userLogin.id)
        let filteredFeeds = []
        for (let i = 0; i < myFeeds.length; i++) {
          if (filteredFeeds.length === 0 || !filteredFeeds.map(feed => feed.id).includes(myFeeds[i].id)) {
            filteredFeeds.push(myFeeds[i])
          }
        }
        setFeeds(filteredFeeds)
      })
  }, [userLogin.id])

  if (feeds) {

    return (
      <div className='all-messages-container'>
        <Container>
          <Row className='text-center mt-2'>
            <h1 className='all-messages-title'>All Message Feeds</h1>
          </Row>
          <Row className='mt-2'>
            <Col className='d-flex justify-content-center'>
              <Card className='message-feed-container'>
                <ListGroup className='message-listgroup' variant="flush">
                  {feeds.map(request =>
                    <Link className='message-link' key={request.id} state={request} to={'/requestdetails'}>
                      <ListGroupItem className='message-list-item'>
                        <Row>
                          <Col>
                          <Row className='message-detail-row'>
                            <h5 className='message-detail'>{request.name}</h5>
                          </Row>
                          <Row className='message-detail-row'>
                            <h6 className='message-detail'>{request.launch_site}</h6>
                          </Row>
                          </Col>
                          <Col className='text-end'>
                            {request.request_status==='Pending' && <Badge bg="primary">{request.request_status}</Badge>}
                            {request.request_status==='Scheduled' && <Badge bg="dark">{request.request_status}</Badge>}
                            {request.request_status==='Denied' && <Badge bg="danger">{request.request_status}</Badge>}
                            {request.request_status==='Launched' && <Badge bg="success">{request.request_status}</Badge>}
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </Link>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

    );
  }
}

export default AllMessages;