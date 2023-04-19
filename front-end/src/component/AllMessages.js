import { useState,useContext, useEffect } from "react";
import { RocketInfo } from "../App";
import {Container, Row, Col} from 'react-bootstrap'
import './AllMessages.css'
import { Link } from 'react-router-dom';

const AllMessages = () => {

  const [feeds,setFeeds] = useState(null)
  const { userLogin } = useContext(RocketInfo);


  useEffect(()=> {
    fetch(`http://localhost:8080/join/launch_requests-messages`)
      .then(res=>res.json())
      .then(data=> {
        let myFeeds = data.filter(request=>request.sender_id===userLogin.id || request.recipient_id === userLogin.id)
        //grab only unique request ids to prevent duplicates
        let filteredFeeds = []
        for(let i=0;i<myFeeds.length;i++){
          if(filteredFeeds.length===0 || !filteredFeeds.map(feed=>feed.id).includes(myFeeds[i].id)){
            filteredFeeds.push(myFeeds[i])
          }
        }
        setFeeds(filteredFeeds)})
  },[userLogin.id])

  if(feeds){

    return ( 
    <div className='all-messages-container'>
        <Container>
            <Row>
              <h1>All Message Feeds</h1>
              </Row>
              <Row>
              <Col>
              {feeds.map(request=> 
                <Row key={request.id}>
                  <Col>
                    <Link state={request} to={'/requestdetails'}> Request for: {request.name} </Link>
                  </Col>
                </Row>
                )}
              </Col>
            </Row>
          </Container>
      </div>
  
     );
  }
}
 
export default AllMessages;