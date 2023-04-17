import React, { useState, useContext, useEffect } from "react"
import { LspDistro } from "./01_lsp_profile_page";
import { Form, Modal, Container, Row, Col, Card, Button } from 'react-bootstrap'
import RequestList from "./05_lsp_requests_list";
import { RocketInfo } from "../../App"; import axios from "axios";
export default LspLaunchVehicles;


function LspLaunchVehicles() {
  const { userLogin, setUserLogin, availablePads, setAvailablePads} = useContext(RocketInfo);
  const [name, setName] = useState();
  const [cost, setCost] = useState();
  const [pad, setPad] = useState();
  const [status, setStatus] = useState();
  const [meoWeight, setMeoWeight] = useState();
  const [leoWeight, setLeoWeight] = useState();
  const [heoWeight, setHeoWeight] = useState();
  const [geoWeight, setGeoWeight] = useState();
  const [submitVehicle, setSubmitVehicle] = useState()
  const [getInfo, setGetInfo] = useState(false)
  const [launchVehicle, setLaunchVehicle] = useState([]);
 

  // useEffect(() => {
  //   fetch('http://localhost:8080/table/launch_vehicles')
  //     .then(res => res.json())
  //     .then(data => setLaunchVehicle(data))
  // }, [])

       useEffect(() => {
            getEvents();
            const interval = setInterval(getEvents, 2000)
            return () => clearInterval(interval)
       }, [])
    
        const getEvents = () => {
            axios.get('http://localhost:8080/table/launch_vehicles')
            .then((res) => {
                setLaunchVehicle(res.data);
            })
        }
        // console.log(launchVehicle)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true)
  //Add a new vehicle
  const addNewVehicle = (event) => {
    fetch("http://localhost:8080/table/launch_vehicles", {
      method: "POST",
      body: JSON.stringify({
        lsp_user_id: userLogin.id,
        launch_vehicle: name,
        launch_pad_id: availablePads.id ,
         cost: cost,
         booked_status: status,
        meo_weight: meoWeight,
        leo_weight: leoWeight,
        geo_weight: geoWeight,
        heo_weight: heoWeight,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then(() => setGetInfo(true))
  }
  
    const statusChoice = ["Available","Booked"]
  const filteredVehicle = launchVehicle?.filter(element => element.lsp_user_id === userLogin.id)

  return (<>
    {/* <Container> */}
      <Row>
        <Col className="col-3">
          <Card>
            <Card.Title>
              Launch Vehicle
              <Button show=
              {show} onClick={handleShow}> Add Launch Vehicle</Button>
            </Card.Title>
            {filteredVehicle?.map((vehicle, j) => {
              return (<Card.Body key={j}>
                <Card.Text>
                  ID: {vehicle.id}
                  <br></br>
                  Rocket: {vehicle.launch_vehicle}
                  <br></br>
                  Status: {vehicle.booked_status}
                </Card.Text>
              </Card.Body>)
            })}
          </Card>
        </Col>
      </Row>
    {/* </Container> */}

    <Modal show={show} onHide={handleClose}>
      <Modal.Header> Add Vehicle</Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event) => {
          event.preventDefault();
          addNewVehicle()
          setSubmitVehicle()
        }}>
          <Form.Group
            onChange={(e) => setName(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
            <Form.Label>Launch Vehicle</Form.Label>
            <Form.Control type="text" placeholder="name" />
          </Form.Group>
          <Form.Group
            onChange={(e) => setCost(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
            <Form.Label>Cost</Form.Label>
            <Form.Control type="text" placeholder="cost" />
          </Form.Group>
          <Form.Group onChange={(e) => setPad(e.target.value)}
            className="mb-3"
            controlId="formDropDown">
            <Form.Label>Launch_Pad</Form.Label>
            <Form.Select onChange={(e) => setPad(e.target.value)}> 
            {availablePads?.map((element) => <option> {element.launch_pad} </option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group onChange={(e) => setStatus(e.target.value)}
            className="mb-3"
            controlId="formDropDown">
            <Form.Label>Status</Form.Label>
            <Form.Select onChange={(e) => setStatus(e.target.value)}> 
          <option value={"available"}> Available </option>
          <option value={"booked"}> Booked </option>
            </Form.Select>
          </Form.Group>
          <Form.Group onChange={(e) => setMeoWeight(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
            <Form.Label>Meo Weight in tons</Form.Label>
            <Form.Control type="text" placeholder="Meo Weight" />
          </Form.Group>
          <Form.Group onChange={(e) => setLeoWeight(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
            <Form.Label>Leo Weight in tons</Form.Label>
            <Form.Control type="text" placeholder="Leo Weight" />
          </Form.Group>
          <Form.Group onChange={(e) => setGeoWeight(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
            <Form.Label>Geo Weight in tons</Form.Label>
            <Form.Control type="text" placeholder="Geo Weight" />
          </Form.Group>
          <Form.Group onChange={(e) => setHeoWeight(e.target.value)}
            className="mb-3"
            controlId="formBasicEmail">
            <Form.Label>Heo Weight in tons</Form.Label>
            <Form.Control type="text" placeholder="Heo Weight" />
          </Form.Group>
          <Button onClick={handleClose}
          type="submit"
          >Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  </>



  )


}

