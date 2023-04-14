import React, { useState, useContext, useEffect } from "react"
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { RocketInfo } from "../../App"
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

import './00_lsp_profile.css'
export default LspLaunchPads

function LspLaunchPads() {
  const { userLogin } = useContext(RocketInfo);
  const [ launchPad, setLaunchPad ] = useState();

  const [weight, setWeight] = useState();
  const [orbit, setOrbit] = useState();
  const [name, setName] = useState();

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

  // ADD PAYLOAD POST
//   const handlePost = (e) => {
//     fetch("http://localhost:8080/table/payloads", {
//       method: "POST",
//       body: JSON.stringify({
//         payload_user_id: userLogin.id,
//         weight: weight,
//         orbital_requirement: orbit,
//         name: name,
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     }).then(() => setFetchTime(true));
//   };

//   const handleUpdate = () => {
//     fetch(`http://localhost:8080/table/payloads?id=${selectedPayload.id}`, {
//       method: "PATCH",
//       body: JSON.stringify({
//         weight: weight,
//         orbital_requirement: orbit,
//         name: name
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     }).then(() =>  setFetchTime(true));
//   };
//   const handleDelete = () => {
//     fetch('http://localhost:8080/table/payloads', {
//       method: "DELETE",
//       body: JSON.stringify({
//         id: selectedPayload.id
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8"
//       }
//     })
//     .then(res => {
//       setSelectedPayload()
//       if(res.status === 200){
//         console.log('Deleted.')
//         setFetchTime(true)
//       }
//       else{
//         console.log(res.status)
//       }
//     })
// }


  const availablePads = launchPad?.filter((element) => element.lsp_user_id === userLogin.id)

  return (
  <>
    <Row>
      <Col className="col-3">
    <h1>Launch Pads</h1> 
    <Button> Add a New Pad</Button>
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
                <button>Edit</button>
                <button>Delete</button>
              </Card.Text>
              {/* <div>add New Pad</div> */}
            </Card.Body>
          </Card>

        )
      })}</Col>
      </Row>



      {/* <Modal show={show} onHide={handleClose} className="modalBg">
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
      </Modal> */}


      </>
      )
}
