import { useState,useContext, useEffect } from "react";
import { RocketInfo } from "../App";
import { useNavigate } from "react-router";
import {Container, Row, Col} from 'react-bootstrap'
import './AllMessages.css'

const AllMessages = ({setSelectedRequest}) => {

  const [feeds,setFeeds] = useState(null)
  const { userLogin } = useContext(RocketInfo);

  const navigate = useNavigate();

  const handleClick = (request) => {
    setSelectedRequest(request)
    navigate('/requestdetails')
  }

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
  },[])

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
                <Row>
                  <Col onClick={()=>{handleClick(request)}}>
                    Payload: {request.name}
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