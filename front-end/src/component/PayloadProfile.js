import React, { useContext } from "react";
import "./PayloadProfile.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { RocketInfo } from "../App";
import Notifications from "./Notifications";

function PayloadProfile() {
  const [submittedPayloads, setSubmittedPayloads] = useState();
  const [userPayloads, setUserPayloads] = useState();
  const [selectedPayload, setSelectedPayload] = useState();
  const [fetchTime, setFetchTime] = useState(false)

  //USECONTEXT
  const {userLogin} = useContext(RocketInfo)

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

  //UPDATE BUTTON PAYLOAD USESTATES
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);
  //UPDATE BUTTON PAYLOAD USESTATES

  //UPDATE BUTTON PAYLOAD USESTATES
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  //UPDATE BUTTON PAYLOAD USESTATES

  useEffect(() => {
    fetch("http://localhost:8080/join/launch_requests")
      .then((res) => res.json())
      .then((data) => setSubmittedPayloads(data));
  }, [userPayloads]);
  useEffect(() => {
    fetch("http://localhost:8080/table/payloads")
      .then((res) => res.json())
      .then((data) => {setUserPayloads(data); setFetchTime(false)});
  }, [fetchTime]);


  let payloads = submittedPayloads?.filter((e, i) => e.payload_user_id === userLogin.id);
  let newPayloads = userPayloads?.filter((e, i) => e.payload_user_id === userLogin.id);

  let filteredPayloads =   newPayloads?.filter((pay, i) =>  payloads?.map((item,i)=>item.payload_id).includes(pay.id) === false )

  // ADD PAYLOAD POST
  const handlePost = (e) => {
    fetch("http://localhost:8080/table/payloads", {
      method: "POST",
      body: JSON.stringify({
        payload_user_id: userLogin.id,
        weight: weight,
        orbital_requirement: orbit,
        name: name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => setFetchTime(true));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8080/table/payloads?id=${selectedPayload.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        weight: weight,
        orbital_requirement: orbit,
        name: name
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() =>  setFetchTime(true));
  };
  const handleDelete = () => {
    fetch('http://localhost:8080/table/payloads', {
      method: "DELETE",
      body: JSON.stringify({
        id: selectedPayload.id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => {
      setSelectedPayload()
      if(res.status === 200){
        console.log('Deleted.')
        setFetchTime(true)
      }
      else{
        console.log(res.status)
      }
    })
}



  return (
    <>
    <Notifications />
      <Container fluid className="App py-2 overflow-hidden">
        <Row className="justify-content-center profileRow">
          <Col className="profileCol">
                <Card className="payloadProfileCard">
                  <Card.Body>
                    <Card.Title>{userLogin.organization}</Card.Title>
                    <Card.Text>Username: {userLogin.username}</Card.Text>
                    <footer>
                      <small>User Created: {userLogin.updated_at}</small>
                    </footer>
                  </Card.Body>
                </Card>
          </Col>


          <Col xs={6}>
            <Row className="payloadsTitle">
              <h3>Submitted Payloads</h3>
            </Row>
            {payloads?.map((payload, i) => {
              return (
                <Card>
                  <Card.Body className="payloadsCol">
                    <Card.Title>{payload.name}</Card.Title>
                    <Card.Text>Status: {payload.request_status}</Card.Text>
                    <footer>
                      <small>Payload Created: {payload.updated_at}</small>
                    </footer>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>

          <Col xs lg="2" className="addCol">
            <Card className="buttonCard">
              <Card.Body>
                <Button
                  className="addPayload"
                  variant="outline-primary"
                  onClick={handleShow}
                >
                  +
                </Button>
                <Card.Title>Add Payload</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="createdPayloads">
          <Col></Col>
          <Col xs={6}>
            <h3>Non Submitted Payloads:</h3>
          
         {filteredPayloads?.map((pay,i)=> {

                return (
                  <>
                    <Card>
                      <Card.Body className="createdPayloadsCol">
                        <Card.Title>{pay.name}</Card.Title>
                        <Card.Text>
                          Status: Click{" "}
                          <Link state={pay} to='/request'>
                            Here
                          </Link>{" "}
                          to book with a Launch Provider
                        </Card.Text>
                        <footer>
                          <small>Payload Created: {pay.updated_at}</small>
                        </footer>
                        <Button onClick={() => [setSelectedPayload(pay), handleShowUpdate(),]}>
                          Update
                        </Button>
                        <Button onClick={() => [setSelectedPayload(pay), handleShowDelete(),]}>
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </>
                );
              }
            )}
          </Col>
          <Col xs lg="2"></Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} className="modalBg">
        <Modal.Header closeButton className="modalForm">
          <Modal.Title>Add Payload</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalForm">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handlePost();
              setSubmittedPayloads();
            }}
          >
            <Form.Group
              onChange={(e) => setName(e.target.value)}
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label>Payload Name</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group
              onChange={(e) => setWeight(e.target.value)}
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>Weight</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Orbit</Form.Label>
              <Form.Select onChange={(e) =>
                setOrbit(e.target.value)}>
                <option></option>
                <option>GEO</option>
                <option>HEO</option>
                <option>LEO</option>
                <option>MEO</option>
              </Form.Select>
            </Form.Group>
            <Button
              onClick={handleCloseUpdate}
              className="addPayload"
              variant="primary"
              type="submit"
            >
              Add
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modalForm">
          <Button
            className="addPayload"
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate} className="modalBg">
        <Modal.Header closeButton className="modalForm">
          <Modal.Title>Update Payload</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalForm">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
              setSubmittedPayloads();
            }}
          >
            <Form.Group
              onChange={(e) => setName(e.target.value)}
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label>Payload Name</Form.Label>
              <Form.Control
                defaultValue={selectedPayload?.name}
                type="text"
                placeholder=""
              />
            </Form.Group>

            <Form.Group
              onChange={(e) => setWeight(e.target.value)}
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>Weight</Form.Label>
              <Form.Control
                defaultValue={selectedPayload?.weight}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Orbit</Form.Label>
              <Form.Select
                defaultValue={selectedPayload?.orbital_requirement}
                onChange={(e) => setOrbit(e.target.value)}
              >
                <option>GEO</option>
                <option>HEO</option>
                <option>LEO</option>
                <option>MEO</option>
              </Form.Select>
            </Form.Group>
            <Button
              onClick={() =>handleCloseUpdate()}
              className="addPayload"
              variant="primary"
              type="submit"
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modalForm">
          <Button
            className="addPayload"
            variant="outline-primary"
            onClick={() => handleCloseUpdate()}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      
{/* DELETE MODAL */}


      <Modal show={showDelete} onHide={handleCloseDelete} className="modalBg">
        <Modal.Header closeButton className="modalForm">
          <Modal.Title>DELETE Payload?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form.Label>Are you sure you want to delete: {selectedPayload?.name} </Form.Label>
      
        <Button
              onClick={() => {
                handleDelete();
                handleCloseDelete();
              }}
              className="addPayload"
              variant="outline-primary"
              type="submit"
            >
              Delete
            </Button>
        </Modal.Body>
        
        <Modal.Footer className="modalForm">
          <Button
            className="addPayload"
            variant="secondary"
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>



  );
}

export default PayloadProfile;
