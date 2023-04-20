import React, { useState, useContext, useEffect } from "react";
import { Col, Card, Tab, Tabs, ListGroup, ListGroupItem ,Button} from 'react-bootstrap'
import { RocketInfo } from "../../App"
import { Modal } from "react-bootstrap";
import '../../css/lsp_requests_list.css'

const RequestList = () => {
  const { userLogin, setRefresh, myRequests, setMyRequests } = useContext(RocketInfo);

  const [myUsers, setMyUsers] = useState([])
  const [selectedRequest, setSelectedRequest] = useState()
  const [responseMessage, setResponseMessage] = useState('')
  const [decision, setDecision] = useState('')
  const [fetchTime, setFetchTime] = useState(false)

  useEffect(() => {
    if (userLogin) {
      fetch('http://localhost:8080/join/launch_requests')
        .then(res => res.json())
        .then(data => data.filter(e => e.lsp_user_id === userLogin.id && e.request_status === "Pending"))
        .then(filtered => setMyRequests(filtered.sort((a, b) => a.id - b.id)))
        .then(() => setFetchTime(false))
    }
  }, [userLogin, fetchTime])


  useEffect(() => {
    if (myRequests) {
      fetch('http://localhost:8080/table/users')
        .then(res => res.json())
        .then(data => data.filter(e => myRequests.map(e => e.payload_user_id).includes(e.id)))
        .then(filtered => setMyUsers(filtered.sort((a, b) => a.id - b.id)))
    }
  }, [myRequests])

  const respondRequest = () => {
    if (selectedRequest && responseMessage && decision) {
      fetch('http://localhost:8080/table/messages', {
        method: "POST",
        body: JSON.stringify({
          sender_id: userLogin.id, //user id of who's sending
          recipient_id: selectedRequest.payload_user_id, //user id of recipient
          launch_request_id: selectedRequest.id, //launch request associated with the event
          message: responseMessage, // message content
          notification_type: decision === "deny" ? "Request denied" : "Request accepted", //"Request denied" or "Request accepted"
          notification_ack: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })

        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
      if (decision === 'approve') {
        fetch(`http://localhost:8080/table/launch_vehicles?id=${selectedRequest.launch_vehicle_id}`, {
          method: "PATCH",
          body: JSON.stringify({
            booked_status: 'booked',
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then(res => {
            if (res.status === 200) {
              setRefresh(true)
            }
          })
      }
      fetch(`http://localhost:8080/table/launch_requests?id=${selectedRequest.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          request_status: decision === "deny" ? "Denied" : "Scheduled",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setDecision('')
          setResponseMessage('')
          setSelectedRequest()
          setFetchTime(true)
        })
        .catch(err => console.error(err))
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Card>
        <Tabs
          defaultActiveKey="0"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          {myUsers?.map((user, index) => (
            <Tab key={index} eventKey={index} title={user.organization}>
              <ListGroup variant='flush'>
              {myRequests?.map((e, i) => {
                if (e.payload_user_id == user.id) {
                  return (
                    <ListGroupItem key={`request: ${i}`} action>
                      <p>
                        Launch Date: {formatDate(e.launch_date)}<br />
                        Launch Site: {e.launch_site}<br />
                        Launch Vehicle: {e.launch_vehicle}<br />
                        Payload: {e.name}<br />
                        Orbit: {e.orbital_requirement}<br />
                        Weight: {e.weight} Tons<br />
                        Request Status: {e.request_status}<br />
                      </p>
                      <Button className="addPayload" onClick={() => { setDecision('approve'); setSelectedRequest(e) }}>Approve</Button>
                      <Button className="addPayload" onClick={() => { setDecision('deny'); setSelectedRequest(e) }}>Deny</Button>
                    </ListGroupItem>
                )}
              })}
              </ListGroup>
            </Tab>
          ))}
        </Tabs>
      </Card>
      <Modal show={decision} onHide={() => { setDecision(''); setResponseMessage('') }}>
        <Modal.Header closeButton>
          <Modal.Title>Payload Request Response: {decision.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            id="paraBox"
            rows="2"
            cols="25"
            placeholder="Enter your response message here"
            onChange={(e) => setResponseMessage(e.target.value)}>
          </textarea>
        </Modal.Body>
        <Modal.Footer>
          <button disabled={!responseMessage} onClick={() => respondRequest()}>Submit Decision</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


export default RequestList;
