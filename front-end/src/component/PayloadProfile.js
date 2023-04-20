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
import ReactPaginate from "react-paginate";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PayloadCalendar from "./PayloadCalendar.js";

function PayloadProfile() {
  const [submittedPayloads, setSubmittedPayloads] = useState();
  const [userPayloads, setUserPayloads] = useState();
  const [selectedPayload, setSelectedPayload] = useState();
  const [fetchTime, setFetchTime] = useState(false);
  const [shownPage, setShownPage] = useState(0);

  //Pagination Stuff here
  function handlePageClick({ selected: selectedPage }) {
    // console.log("selectedpage", selectedPage);
    setShownPage(selectedPage);
  }
  const perPage = 2;
  const offset = shownPage * perPage;

  //For tabs to be active
  const [key, setKey] = useState("home");

  //USECONTEXT
  const { userLogin } = useContext(RocketInfo);

  //PAYLOADS USESTATES
  const [weight, setWeight] = useState();
  const [orbit, setOrbit] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
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
      .then((data) => {
        setUserPayloads(data);
        setFetchTime(false);
      });
  }, [fetchTime]);

  console.log('here', userPayloads)
  let payloads = submittedPayloads?.filter(
    (e, i) => e.payload_user_id === userLogin.id
  );
  let newPayloads = userPayloads?.filter(
    (e, i) => e.payload_user_id === userLogin.id
  );

  let filteredPayloads = newPayloads?.filter(
    (pay, i) =>
      payloads?.map((item, i) => item.payload_id).includes(pay.id) === false
  );

  // ADD PAYLOAD POST
  const handlePost = (e) => {
    fetch("http://localhost:8080/table/payloads", {
      method: "POST",
      body: JSON.stringify({
        payload_user_id: userLogin.id,
        weight: weight,
        description: description,
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
        description: description,
        orbital_requirement: orbit,
        name: name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => setFetchTime(true));
  };
  const handleDelete = () => {
    fetch("http://localhost:8080/table/payloads", {
      method: "DELETE",
      body: JSON.stringify({
        id: selectedPayload.id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        setSelectedPayload();
        if (res.status === 200) {
          setFetchTime(true);
        }
      })
      .catch((err) => console.log(err));
  };

  let launched = payloads?.filter((e, i) => e.request_status === "Launched");
  let pending = payloads?.filter((e, i) => e.request_status === "Pending");
  let scheduled = payloads?.filter((e, i) => e.request_status === "Scheduled");
  let denied = payloads?.filter((e, i) => e.request_status === "Denied");

  //Filter for pagination
  const currentPageData = filteredPayloads
    ?.slice(offset, offset + perPage)
    .map((pay, i) => {
      return (
        <>
          <Card>
            <Card.Body className="createdPayloadsCol">
              <Card.Title>{pay.name}</Card.Title>
              <Card.Text>
                Status: Click{" "}
                <Link state={pay} to="/request">
                  Here
                </Link>{" "}
                to book with a Launch Provider
                <br></br>
                Payload Info: {pay.description}
              </Card.Text>
              <footer>
                <small>Payload Created: {pay.updated_at}</small>
              </footer>
              <Button
                className="updateDeleteButtons"
                onClick={() => [setSelectedPayload(pay), handleShowUpdate()]}
              >
                Update
              </Button>
              <Button
                className="updateDeleteButtons"
                onClick={() => [setSelectedPayload(pay), handleShowDelete()]}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </>
      );
    });


  return (
    <>
      <div style={{ height: "100vh" }}>
        <Notifications />
        <Container fluid>
          <Row className="profileRow">
            <Col>
              <Row className="mt-5">
                <PayloadCalendar />
              </Row>
            </Col>

            <Col xs={6} className="secondCol">
              <Row className="payloadsTitle d-flex justify-content-between">
                <div className="titleRowButton">
                  <h3 className="colTitle"> Payloads</h3>
                  <Button
                    onClick={handleShow}
                    size="sm"
                    className="btn ml-5 addPayloadRight"
                  >
                    {" "}
                    + Add Payload
                  </Button>
                </div>
              </Row>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 tabsPayloads"
              >
                <Tab
                  tabClassName="color-black"
                  eventKey="home"
                  title="Launched"
                  className="search-listgroup1"
                >
                  {launched?.map((e, i) => {
                    return (
                      <Link
                        state={e}
                        to="/requestdetails"
                        className="request-link-to-details"
                      >
                        <Card key={i}>
                          <Card.Body className="payloadsCol">
                            <Card.Title>{e.name}</Card.Title>
                            <Card.Text>
                              Status: {e.request_status}
                              <br></br>
                              Payload Info: {e.description}
                            </Card.Text>
                            <footer>
                              <small>Payload Created: {e.updated_at}</small>
                            </footer>
                          </Card.Body>
                        </Card>
                      </Link>
                    );
                  })}
                </Tab>
                <Tab
                  tabClassName="color-black"
                  eventKey="profile"
                  title="Pending"
                  className="search-listgroup1"
                >
                  {pending?.map((e, i) => {
                    return (
                      <Link
                        state={e}
                        to="/requestdetails"
                        className="request-link-to-details"
                      >
                        <Card key={i}>
                          <Card.Body className="payloadsCol">
                            <Card.Title>{e.name}</Card.Title>
                            <Card.Text>
                              Status: {e.request_status}
                              <br></br>
                              Payload Info: {e.description}
                            </Card.Text>
                            <footer>
                              <small>Payload Created: {e.updated_at}</small>
                            </footer>
                          </Card.Body>
                        </Card>
                      </Link>
                    );
                  })}
                </Tab>
                <Tab
                  tabClassName="color-black"
                  eventKey="longer-tab"
                  title="Scheduled"
                  className="search-listgroup1"
                >
                  {scheduled?.map((e, i) => {
                    return (
                      <Link
                        state={e}
                        to="/requestdetails"
                        className="request-link-to-details"
                      >
                        <Card key={i}>
                          <Card.Body className="payloadsCol">
                            <Card.Title>{e.name}</Card.Title>
                            <Card.Text>
                              Status: {e.request_status}
                              <br></br>
                              Payload Info: {e.description}
                            </Card.Text>
                            <footer>
                              <small>Payload Created: {e.updated_at}</small>
                            </footer>
                          </Card.Body>
                        </Card>
                      </Link>
                    );
                  })}
                </Tab>
                <Tab
                  tabClassName="color-black"
                  eventKey="denied"
                  title="Denied"
                  className="search-listgroup1"
                >
                  {denied?.map((e, i) => {
                    let pendingIDs = pending.map((item) => item.payload_id);
                    let scheduledIDs = scheduled.map((item) => item.payload_id);
                    if (
                      !pendingIDs.includes(e.payload_id) &&
                      !scheduledIDs.includes(e.payload_id)
                    ) {
                      return (
                        <Link
                          state={e}
                          to="/requestdetails"
                          className="request-link-to-details"
                        >
                          <Card key={i}>
                            <Card.Body className="payloadsCol">
                              <Card.Title>{e.name}</Card.Title>
                              <Card.Text>Status: {e.request_status}</Card.Text>
                              Status: Click{" "}
                              <Link state={e} to="/request">
                                Here
                              </Link>{" "}
                              to rebook with a Launch Provider
                              <br></br>
                              Payload Info: {e.description}
                              <footer>
                                <small>Payload Created: {e.updated_at}</small>
                              </footer>
                            </Card.Body>
                          </Card>
                        </Link>
                      );
                    } else {
                      return (
                        <Link
                          state={e}
                          to="/requestdetails"
                          className="request-link-to-details"
                        >
                          <Card key={i}>
                            <Card.Body className="payloadsCol">
                              <Card.Title>{e.name}</Card.Title>
                              <Card.Text>Status: {e.request_status}</Card.Text>
                              Payload has been rebooked or rescheduled
                              <footer>
                                <small>Payload Created: {e.updated_at}</small>
                              </footer>
                            </Card.Body>
                          </Card>
                        </Link>
                      );
                    }
                  })}
                </Tab>
                <Tab
                  tabClassName="color-black"
                  eventKey="test"
                  title="Non submitted"
                  className="search-listgroup1"
                >
                  {filteredPayloads?.map((e, i) => {
                    return (
                   
                        <Card key={i}>
                          <Card.Body className="payloadsCol">
                            <Card.Title>{e.name}</Card.Title>
                            <Card.Text>
                              Status: Click{" "}
                              <Link state={e} to="/request">
                                Here
                              </Link>{" "}
                              to book with a Launch Provider
                              <br></br>
                              Payload Info: {e.description}
                            </Card.Text>
                            <footer>
                              <small>Payload Created: {e.updated_at}</small>
                            </footer>
                            <Button
                              className="updateDeleteButtons"
                              onClick={() => [setSelectedPayload(e), handleShowUpdate()]}
                            >
                              Update
                            </Button>
                            <Button
                              className="updateDeleteButtons"
                              onClick={() => [setSelectedPayload(e), handleShowDelete()]}
                            >
                              Delete
                            </Button>
                          </Card.Body>
                        </Card>
                    );
                  })}
                  
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>

    {/* CREATE */}
      <Modal show={show} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton className="modalForm">
          <Modal.Title>Add Payload</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalForm">
          <Form
            className="row w-100"
            onSubmit={(e) => {
              e.preventDefault();
              handlePost();
              setSubmittedPayloads();
            }}
          >
            <Col className="ml-5">
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
                  type="number"
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
            </Col>

            <Col>
              <Form.Group
                onChange={(e) => setDescription(e.target.value)}
                className="mb-3"
                
              >
                <Form.Label>Description</Form.Label>
                <textarea
                  rows={8}
                  className="form-control"
                  defaultValue={selectedPayload?.description}
                />
              </Form.Group>

              <Button
                onClick={() => handleClose()}
                className="addPayload"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Col>
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

      {/* UPDATE */}
      <Modal show={showUpdate} onHide={handleCloseUpdate} className="modal-lg">
        <Modal.Header closeButton className="modalForm">
          <Modal.Title>Update Payload</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalForm">
          <Form
            className="row w-100"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
              setSubmittedPayloads();
            }}
            
          >
            <Col className="ml-5">
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
                  type="number"
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
            </Col>

            <Col>
              <Form.Group
                onChange={(e) => setDescription(e.target.value)}
                className="mb-3"
                
              >
                <Form.Label>Description</Form.Label>
                <textarea
                  rows={8}
                  className="form-control"
                  defaultValue={selectedPayload?.description}
                />
              </Form.Group>

              <Button
                onClick={() => handleCloseUpdate()}
                className="addPayload"
                variant="primary"
                type="submit"
              >
                Update
              </Button>
            </Col>
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
          <Form.Label>
            Are you sure you want to delete: {selectedPayload?.name}{" "}
          </Form.Label>

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
