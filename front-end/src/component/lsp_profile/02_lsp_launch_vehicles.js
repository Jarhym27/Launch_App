import React, { useState, useContext, useEffect } from "react";
import { LspDistro } from "./01_lsp_profile_page";
import {
  Form,
  Modal,
  Container,
  Row,
  Col,
  Card,
  Button,
  InputGroup
} from "react-bootstrap";
import RequestList from "./05_lsp_requests_list";
import { RocketInfo } from "../../App";
import { RocketTakeoffFill } from "react-bootstrap-icons";
import { BsCalendar4Week } from 'react-icons/bs';
import { GiWeight } from 'react-icons/gi'
import { FcMoneyTransfer } from 'react-icons/fc'
import { SiLaunchpad } from 'react-icons/si'
import LspLaunchPads from "./03_lsp_launch_pads";


export default LspLaunchVehicles;

function LspLaunchVehicles() {
  const { userLogin, setUserLogin, availablePads, setAvailablePads, refresh, setRefresh } = useContext(RocketInfo);
  const [name, setName] = useState();
  const [cost, setCost] = useState();
  const [pad, setPad] = useState();
  const [status, setStatus] = useState('available');
  const [meoWeight, setMeoWeight] = useState();
  const [leoWeight, setLeoWeight] = useState();
  const [heoWeight, setHeoWeight] = useState();
  const [geoWeight, setGeoWeight] = useState();
  const [submitVehicle, setSubmitVehicle] = useState()
  const [getInfo, setGetInfo] = useState(false)
  const [launchVehicle, setLaunchVehicle] = useState([]);
  const [fetchTime, setFetchTime] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);


  useEffect(() => {
    fetch('http://localhost:8080/table/launch_vehicles')
      .then(res => res.json())
      .then(data => { setLaunchVehicle(data); setFetchTime(false); setRefresh(false); })
  }, [fetchTime, refresh])


  const addNewVehicle = (event) => {
    let newVehicle = {
      lsp_user_id: userLogin.id,
      launch_vehicle: name,
      cost: cost,
      meo_weight: meoWeight,
      leo_weight: leoWeight,
      geo_weight: geoWeight,
      heo_weight: heoWeight,
      booked_status: status,
      launch_pad_id: availablePads.id
    }

    fetch("http://localhost:8080/table/launch_vehicles", {
      method: "POST",
      body: JSON.stringify(newVehicle

      ),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then(res => {
        if (res.status === 200) console.log('Successfully added vehicle')
        setFetchTime(true);
      })
      .catch(err => console.log('Error:\n', err))

  };


  const handleUpdate = () => {
    console.log('name from update:\n', name)
    console.log('status from update:\n', status)
    console.log('status from update:\n', pad)
    fetch(`http://localhost:8080/table/launch_vehicles?id=${selectedVehicle.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        launch_vehicle: name,
        booked_status: status,
        cost: cost,
        meo_weight: meoWeight,
        leo_weight: leoWeight,
        geo_weight: geoWeight,
        heo_weight: heoWeight,
        booked_status: status,
        launch_pad_id: availablePads.id

      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status === 200) console.log('Successfully updated')
        setFetchTime(true)
      })
      .catch((err) => console.log('Error:\n', err))

  };

  const handleDelete = () => {
    let newVehicleList = launchVehicle.filter(item => item.id !== selectedVehicle.id);
    setLaunchVehicle(newVehicleList);
    setSelectedVehicle([]);
    fetch('http://localhost:8080/table/launch_vehicles', {
      method: "DELETE",
      body: JSON.stringify({
        id: selectedVehicle.id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => {
        setSelectedVehicle()
        if (res.status === 200) {
          console.log('Deleted.')
          setFetchTime(true)
        }
        else {
          console.log(res.status)
        }
      })
  }


  const filteredVehicle = launchVehicle?.filter(element => element.lsp_user_id === userLogin.id)


  return (
    <>
      <Row >
        <Col className="watchTheRoad">
          <h1 className="noiceText">Launch Vehicles</h1>
          <Button className="addPayload" onClick={handleShow}>
            Add Launch Vehicle</Button>
          <Card className="lspListings">
            <Card.Title>
            </Card.Title>
            {filteredVehicle?.map((vehicle, j) => {
              return (
                <Card.Body key={j}>
                  <Card.Text>
                    Serial ID: {vehicle.id}
                    <br></br>
                    Rocket: {vehicle.launch_vehicle}
                    <br></br>
                    Status: {vehicle.booked_status}
                    <br></br>
                    <img src={`${vehicle.picture}`} />
                    <br></br>
                    <Button className="addPayload" onClick={() => {
                      setSelectedVehicle(vehicle); handleShowUpdate();
                      setName(vehicle.launch_vehicle);
                      console.log('selectedVehicle:\n', selectedVehicle)
                    }}>
                      Edit</Button>
                    <Button className="addPayload" onClick={() => { setSelectedVehicle(vehicle); handleShowDelete(); }}>
                      Delete</Button>
              </Card.Text>
            </Card.Body>
            )
          })}
        </Card>
      </Col>
      <Col>
      <LspLaunchPads/>
      </Col>
    </Row>
    <Modal show={show} onHide={() => handleClose} className="modalBg">
      <Modal.Header closeButton className="modalForm" onClick={handleClose} > Add Vehicle</Modal.Header>
      <Modal.Body className="modalForm">
        <Form onSubmit={(event) => {
          event.preventDefault();
          addNewVehicle()
          setSubmitVehicle()
        }}>
          <InputGroup
            onChange={(e) => setName(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
              <InputGroup.Text><RocketTakeoffFill/></InputGroup.Text>
            <Form.Control type="text" placeholder="Launch Vehicle" />
          </InputGroup>
          <InputGroup
            onChange={(e) => setCost(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">

              <InputGroup.Text><FcMoneyTransfer/></InputGroup.Text>
            <Form.Control type="text" placeholder="Cost" />
          </InputGroup>
          <InputGroup onChange={(e) => setPad(e.target.value)}
            className="mb-3"
            controlId="formDropDown">
              <InputGroup.Text><SiLaunchpad/></InputGroup.Text>
            <Form.Select size='lg'>
              {availablePads?.map((element, i) => <option key={`option: ${i}`}> {element.launch_pad} </option>)}
            </Form.Select>
          </InputGroup>
          <InputGroup onChange={(e) => setLeoWeight(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
              <InputGroup.Text><GiWeight/></InputGroup.Text>
            <Form.Control type="text" placeholder="Mass Capacity to LEO" />
          </InputGroup>
          <InputGroup onChange={(e) => setMeoWeight(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
              <InputGroup.Text><GiWeight/></InputGroup.Text>
            <Form.Control type="text" placeholder="Mass Capacity to MEO" />
          </InputGroup>
          <InputGroup onChange={(e) => setGeoWeight(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
              <InputGroup.Text><GiWeight/></InputGroup.Text>
            <Form.Control type="text" placeholder="Mass Capacity to GEO" />
          </InputGroup>
          <InputGroup onChange={(e) => setHeoWeight(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
              <InputGroup.Text><GiWeight/></InputGroup.Text>
            <Form.Control type="text" placeholder="Mass Capacity to HEO" />
          </InputGroup>
          <Button
           onClick={handleClose}
           className="addPayload"
          variant="primary"
            type="submit"
          >Submit</Button>
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
          <Modal.Title>Update Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalForm">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
              setSubmitVehicle();
            }}
          >
            <Form.Label>Launch Vehicle</Form.Label>
            <InputGroup
              onChange={(e) => setName(e.target.value)}
              className="mb-3"
              controlId="formBasicEmail">
              <InputGroup.Text><RocketTakeoffFill /></InputGroup.Text>
              <Form.Control type="text" placeholder={selectedVehicle?.launch_vehicle} />
            </InputGroup>
            <Form.Label>Launch Cost</Form.Label>
            <InputGroup
              onChange={(e) => setCost(e.target.value)}
              className="mb-3"
              controlId="formBasicEmail">
              <InputGroup.Text><FcMoneyTransfer /></InputGroup.Text>
              <Form.Control type="text" placeholder="Cost" />
            </InputGroup>
            <Form.Label>Launchpad</Form.Label>
            <InputGroup onChange={(e) => setPad(e.target.value)}
              className="mb-3"
              controlId="formDropDown">
              <InputGroup.Text><SiLaunchpad /></InputGroup.Text>
              <Form.Select size='lg'>
                {availablePads?.map((element, i) => <option key={`option: ${i}`}> {element.launch_pad} </option>)}
              </Form.Select>
            </InputGroup>
            <Form.Label>Vehicle Status</Form.Label>
            <InputGroup onChange={(e) => setStatus(e.target.value)}
              className="mb-3"
              controlId="formDropDown">
              <InputGroup.Text><BsCalendar4Week /></InputGroup.Text>
              <Form.Select size='lg'>
                <option value={"available"}>Available</option>
                <option value={"booked"}>Booked</option>
            </Form.Select>
          </InputGroup>

          <Form.Label>LEO Mass Capacity</Form.Label>
          <InputGroup onChange={(e) => setLeoWeight(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
              <InputGroup.Text><GiWeight/></InputGroup.Text>
            <Form.Control type="text" placeholder= {`${selectedVehicle?.leo_weight}kg`} />
          </InputGroup>
          <Form.Label>MEO Mass Capacity</Form.Label>
          <InputGroup onChange={(e) => setMeoWeight(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
              <InputGroup.Text><GiWeight/></InputGroup.Text>
            <Form.Control type="text" placeholder={`${selectedVehicle?.meo_weight}kg`} />
          </InputGroup>
          <Form.Label>GEO Mass Capacity</Form.Label>
          <InputGroup onChange={(e) => setGeoWeight(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
              <InputGroup.Text><GiWeight/></InputGroup.Text>
            <Form.Control type="text" placeholder={`${selectedVehicle?.geo_weight}kg` }/>
          </InputGroup>
          <Form.Label>HEO Mass Capacity</Form.Label>
          <InputGroup onChange={(e) => setHeoWeight(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
              <InputGroup.Text><GiWeight/></InputGroup.Text>
            <Form.Control type="text" placeholder={`${selectedVehicle?.heo_weight}kg`} />
          </InputGroup>
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
          <Modal.Title>DELETE Vehicle?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Label>Are you sure you want to delete: {selectedVehicle?.launch_vehicle} </Form.Label>

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
