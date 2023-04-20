import React, { useState, useContext, useEffect } from "react"
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { RocketInfo } from "../../App"
import { Row, Col, Card, Button, InputGroup } from 'react-bootstrap'
import {GiIsland, GiEarthAmerica} from 'react-icons/gi'
import {FaCity} from 'react-icons/fa'
import { SiLaunchpad } from 'react-icons/si'
import {BsCalendar4Week} from 'react-icons/bs';
import './00_lsp_profile.css'
export default LspLaunchPads

function LspLaunchPads() {
  const { userLogin, availablePads, setAvailablePads, setRefresh, refresh } = useContext(RocketInfo);
  const [launchPad, setLaunchPad] = useState();
  const [fetchTime, setFetchTime] = useState(false)
  const [selectedPad, setSelectedPad] = useState();
  const [city, setCity] = useState();
  const [lpState, setlpState] = useState();
  const [launchSite, setLaunchSite] = useState();
  const [padName, setPadName] = useState();
  const [padStatus, setPadStatus] = useState('');
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
      .then(data => setLaunchPad(data), setFetchTime(false), setRefresh(false))
  }, [fetchTime, refresh])


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
      .then((res) =>{
        if(res.status === 200) console.log('Successfully updated')
        setFetchTime(true)
      }) ;

  };

  const handleDelete = () => {
    let newPadList = launchPad.filter(item => item.id !== selectedPad.id);
    setLaunchPad(newPadList);
    console.log('slected pad id: ',selectedPad.id)
    fetch(`http://localhost:8080/table/launch_pads`, {
      method: "DELETE",
      body: JSON.stringify({
        id: selectedPad.id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => {
        if (res.status === 200) {
          console.log('Deleted.')
          setFetchTime(true)
        }
        else {
          console.log(res.status)
        }
      })
    setSelectedPad();
  }


  useEffect(() => {
    let filteredPads = launchPad?.filter((element) => element.lsp_user_id === userLogin.id)
    setAvailablePads(filteredPads)
  }, [launchPad, userLogin, selectedPad, setAvailablePads, setSelectedPad])

  return (
    <>
      <Row>
        <Col className="mindThePad">
          <h1>Launch Pads</h1>
          <Button className='addPayload' onClick={handleShow}>
          Add New Pad</Button>
        <Card className="lspListingsPad">
          <Card.Title>
          </Card.Title>
          {availablePads?.map((pads, i) => {
            return (
                <Card.Body  key={i} >
                  <Card.Text>
                    Pad: {pads.launch_pad} <br></br>
                    Site: {pads.launch_site} <br></br>
                    Status: {pads.pad_status} <br></br>
                    <Button className="addPayload"  onClick={() => [setSelectedPad(pads), handleShowUpdate(), setPadName(pads.launch_pads)]}>Edit</Button>
                    <Button  className="addPayload" onClick={() => [setSelectedPad(pads), handleShowDelete()]}>Delete</Button>
                  </Card.Text>

                </Card.Body>
                 )})}
              </Card>

         </Col>
      </Row>


      <Modal show={show} onHide={handleClose} className="modalBg">
        <Modal.Header closeButton className="modalForm">
          <Modal.Title>Add Launch Pad</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalForm">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handlePost();
            }}
          >
            <Form.Label>Pad Name</Form.Label>
            <InputGroup
              onChange={(e) => setPadName(e.target.value)}
              className="mb-3"
              controlId="formBasicEmail">
            <InputGroup.Text><SiLaunchpad/></InputGroup.Text>
              <Form.Control type="text" placeholder='' />
            </InputGroup>
            <Form.Label>Pad Status</Form.Label>
            <InputGroup className="mb-3" controlId="formBasicPassword">
              <InputGroup.Text><BsCalendar4Week/></InputGroup.Text>
              <Form.Select size='lg' onChange={(e) =>
                setPadStatus(e.target.value)}>
                <option></option>
                <option value={"Available"}>Available</option>
                <option value={"Unavailable"}>Unavailable</option>
              </Form.Select>
            </InputGroup>
            <Form.Label>Launch Site</Form.Label>
            <InputGroup className="mb-3" controlId="formBasicPassword">
              <InputGroup.Text><GiEarthAmerica/></InputGroup.Text>
              <Form.Select size='lg' onChange={(e) =>
                setLaunchSite(e.target.value)}>
                <option></option>
                <option>Patrick SFB</option>
                <option>Vandenberg SFB</option>
                <option>Wallops Flight Facility</option>
              </Form.Select>
            </InputGroup>
            <Form.Label>City</Form.Label>
            <InputGroup
              onChange={(e) => setCity(e.target.value)}
              className="mb-3"
              controlId="formBasicPassword"
            >
              <InputGroup.Text><FaCity/></InputGroup.Text>
              <Form.Control
                defaultValue={selectedPad?.city}
                type="text"
                placeholder=""
              />
            </InputGroup>
            <Form.Label>State</Form.Label>
            <InputGroup
              onChange={(e) => setlpState(e.target.value)}
              className="mb-3"
              controlId="formBasicPassword"
            >
              <InputGroup.Text><GiIsland/></InputGroup.Text>
              <Form.Control
                defaultValue={selectedPad?.state}
                type="text"
                placeholder=""
              />
            </InputGroup>
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
              handleUpdate(e);
            }}
          >
            <Form.Label>Pad Name</Form.Label>
            <InputGroup
              onChange={(e) => setPadName(e.target.value)}
              className="mb-3"
              controlId="formBasicEmail">
            <InputGroup.Text><SiLaunchpad/></InputGroup.Text>
              <Form.Control type="text" defaultValue={padName} placeholder={selectedPad?.launch_pad} />
            </InputGroup>
            <Form.Label>Pad Status</Form.Label>
            <InputGroup className="mb-3" controlId="formBasicPassword" onChange={(e) =>
                setPadStatus(e.target.value)}>
              <InputGroup.Text><BsCalendar4Week/></InputGroup.Text>
              <Form.Select size='lg' >
                <option></option>
                <option value={"Available"}>Available</option>
                <option value={"Unavailable"}>Unavailable</option>
              </Form.Select>
            </InputGroup>
            <Button
              onClick={() => handleCloseUpdate()}
              className="addPayload"
              type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modalForm">
          <Button
            className="addPayload"
            onClick={() => handleCloseUpdate()}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showDelete} onHide={handleCloseDelete} className="modalBg">
        <Modal.Header closeButton className="modalForm">
          <Modal.Title>Delete Pad?</Modal.Title>
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
