import React, { useState, useContext, useEffect } from "react"
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { RocketInfo } from "../../App"
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

import './00_lsp_profile.css'
export default LspLaunchPads

function LspLaunchPads() {
  const { userLogin, availablePads, setAvailablePads } = useContext(RocketInfo);
  const [launchPad, setLaunchPad] = useState();

  const [fetchTime, setFetchTime] = useState(false)
  const [userPads, setUserPads] = useState();
  const [selectedPad, setSelectedPad] = useState();
  const [submittedPads, setSubmittedPads] = useState();
  const [city, setCity] = useState();
  const [lpState, setlpState] = useState();
  const [launchSite, setLaunchSite] = useState();
  const [padName, setPadName] = useState();
  const [padStatus, setPadStatus] = useState();
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
    fetch('http://localhost:8080/table/launch_pads')
      .then(res => res.json())
      .then(data => setLaunchPad(data))
  }, [])


  // ADD lanchpad POST

  const handlePost = (e) => {
    let newPad = {
      lsp_user_id: userLogin.id,
      city: city,
      state: lpState,
      launch_site: launchSite,
      launch_pad: padName,
      pad_status: padStatus
    }
    fetch("http://localhost:8080/table/launch_pads", {
      method: "POST",
      body: JSON.stringify(newPad),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(res => res.json())
    .then(data => {
//  not pulling id from backend
// newPad.id = data[0].id;
return newPad;
    })
    .then(() => setFetchTime(true));
    setLaunchPad((items) => [...items, newPad])
  };

  const handleUpdate = () => {
    let newPadList = launchPad.filter(item => item.id !== selectedPad.id);
    let updatedPad = selectedPad;
    updatedPad.launch_pad = padName;
    updatedPad.pad_status = padStatus;
    setLaunchPad(newPadList);
    setLaunchPad((items) => [...items, updatedPad]);
    fetch(`http://localhost:8080/table/launch_pads?id=${selectedPad.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        launch_pad: padName,
        pad_status: padStatus
    }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => setFetchTime(true));
  };
  const handleDelete = () => {
    let newPadList = launchPad.filter(item => item.id !== selectedPad.id);
    setLaunchPad(newPadList);
    setSelectedPad([]);
    fetch('http://localhost:8080/table/launch_pads', {
      method: "DELETE",
      body: JSON.stringify({
        id: selectedPad.id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => {
        setSelectedPad()
        if (res.status === 200) {
          console.log('Deleted.')
          setFetchTime(true)
        }
        else {
          console.log(res.status)
        }
      })
  }



  useEffect(() => {

      let filteredPads =launchPad?.filter((element) => element.lsp_user_id === userLogin.id)
      setAvailablePads(filteredPads)
  }, [launchPad, userLogin])

  return (
    <>
   {/* { console.log(availablePads)} */}
    <Row>
      <Col className="col-3">
    <h1>Launch Pads</h1>
    <Button  onClick={handleShow}> Add a New Pad</Button>
      {availablePads?.map((pads, i) => {
        return (
          <Card key={i} >
            <Card.Body>
              <Card.Title>
              </Card.Title>
              <Card.Text>
                Pad: {pads.launch_pad} <br></br>
                {pads.lsp_user_id} <br></br>
                {pads.launch_site} <br></br>
                {pads.pad_status ? 'Status: Available' : 'Status : Unavailable'} <br></br>
                <button onClick={() => [setSelectedPad(pads), handleShowUpdate()]}>Edit</button>
                <button onClick={() => [setSelectedPad(pads), handleShowDelete()]}>Delete</button>
              </Card.Text>
              {/* <div>add New Pad</div> */}
            </Card.Body>
          </Card>

        )
      })}</Col>
      </Row>



      <Modal show={show} onHide={handleClose} className="modalBg">
        <Modal.Header closeButton className="modalForm">
          <Modal.Title>Add Payload</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalForm">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handlePost();
              setSubmittedPads();
            }}
          >
            <Form.Group
              onChange={(e) => setPadName(e.target.value)}
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label>Pad Name</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Pad Status</Form.Label>
              <Form.Select onChange={(e) =>
                setLaunchSite(e.target.value)}>
                <option></option>
                <option value={true}>Available</option>
                <option value={false}>Unavailable</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Launch Site</Form.Label>
              <Form.Select onChange={(e) =>
                setLaunchSite(e.target.value)}>
                <option></option>
                <option>Patrick SFB</option>
                <option>Vandenberg SFB</option>
                <option>Wallops Flight Facility</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              onChange={(e) => setCity(e.target.value)}
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>City</Form.Label>
              <Form.Control
                defaultValue={selectedPad?.city}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group
              onChange={(e) => setlpState(e.target.value)}
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>State</Form.Label>
              <Form.Control
                defaultValue={selectedPad?.state}
                type="text"
                placeholder=""
              />
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
          <Modal.Title>Update Pad</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalForm">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
              setSelectedPad();
            }}
          >
            <Form.Group
              onChange={(e) => setPadName(e.target.value)}
              className="mb-3"
              controlId="formBasicEmail"
            >
              {/* {console.log(selectedPad)} */}
              <Form.Label>Pad Name</Form.Label>
              <Form.Control
                defaultValue={selectedPad?.launch_pad}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group
              onChange={(e) => setPadName(e.target.value)}
              className="mb-3"
              controlId="formBasicEmail"
            >
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Pad Status</Form.Label>
              <Form.Select onChange={(e) =>
                setLaunchSite(e.target.value)}>
                <option value={true}>Available</option>
                <option value={false}>Unavailable</option>
              </Form.Select>
            </Form.Group>



            <Button
              onClick={() => handleCloseUpdate()}
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





      <Modal show={showDelete} onHide={handleCloseDelete} className="modalBg">
        <Modal.Header closeButton className="modalForm">
          <Modal.Title>DELETE Payload?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Label>Are you sure you want to delete: {selectedPad?.launch_pad} </Form.Label>

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
  )
}
