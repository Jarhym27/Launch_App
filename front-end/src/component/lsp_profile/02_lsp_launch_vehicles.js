import React, { useState, useContext, useEffect } from "react"
import { LspDistro } from "./01_lsp_profile_page";
import { Form, Modal, Container, Row, Col, Card, Button } from 'react-bootstrap'
import RequestList from "./05_lsp_requests_list";
import { RocketInfo } from "../../App";
export default LspLaunchVehicles ;


function LspLaunchVehicles() {
  const { userLogin, setUserLogin } = useContext(RocketInfo);
  const [name, setName] = useState();
  const [cost, setCost] = useState();
  const[pad, setPad] = useState();
  const[meoWeight, setMeoWeight] = useState();
  const[leoWeight, setLeoWeight] = useState();
  const[heoWeight, setHeoWeight] = useState();
  const[geoWeight, setGeoWeight] = useState();
  const[submitVehicle, setSubmitVehicle] = useState()
  const[getInfo ,setGetInfo ] = useState(false)
   const[launchVehicle, setLaunchVehicle] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/table/launch_vehicles')
      .then(res => res.json())
      .then(data => setLaunchVehicle(data))
  }, [])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true)
  //Add a new vehicle
const addNewVehicle = (event) =>{
  fetch("http://localhost:8080/table/launch_vehicle", {
    method:"POST",
    body: JSON.stringify({
      lsp_user_id: userLogin.id,
      launch_vehicle: name,
      launch_pad: pad
      , cost: cost, 
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


  //Add a new pad

const filteredVehicle = launchVehicle?.filter(element => element.lsp_user_id === userLogin.id)

return(  <>
  <Container>
  <Row>
    <Col className="col-1">
      <Card>
      <Card.Title>
        Launch Vehicle
        <Button onClick={addNewVehicle}>Add Vehicle</Button>
      </Card.Title>
      {filteredVehicle?.map((vehicle, j) =>{
       return ( <Card.Body key={j}>
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
    </Container>
  
    <Modal show={show} onHide={handleClose}>
      <Modal.Header> Add Vehicle</Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event) =>{
         event.preventDefault();
         addNewVehicle()
         setSubmitVehicle()
        }}>
          <Form.Group
          onChange={(e) => setName(e.target.value)}
          className="mb-3"
          controlId="formBasicEmail">
            <Form.Label>Launch Vehicle</Form.Label>
            <Form.Control type="text" placeholder="name"/>

          </Form.Group>
          <Form.Group
           onChange={(e) => setCost(e.target.value)}
           className="mb-3"
           controlId="formBasicEmail">
            <Form.Label>Cost</Form.Label>
            <Form.Control type="text" placeholder="cost"/>
          </Form.Group>
          <Form.Group onChange={(e) => setPad(e.target.value)}
           className="mb-3"
           controlId="formBasicEmail">
          <Form.Label>Launch_Pad</Form.Label>
            <Form.Control type="text" placeholder="Launch Pad"/>
          </Form.Group>
          <Form.Group onChange={(e) => setMeoWeight(e.target.value)}
           className="mb-3"
           controlId="formBasicEmail">
          <Form.Label>Meo Weight in tons</Form.Label>
            <Form.Control type="text" placeholder="Meo Weight"/>
          </Form.Group>
          <Form.Group onChange={(e) => setLeoWeight(e.target.value)}
           className="mb-3"
           controlId="formBasicEmail">
          <Form.Label>Leo Weight in tons</Form.Label>
            <Form.Control type="text" placeholder="Leo Weight"/>
          </Form.Group>
          <Form.Group onChange={(e) => setGeoWeight(e.target.value)}
           className="mb-3"
           controlId="formBasicEmail">
          <Form.Label>Geo Weight in tons</Form.Label>
            <Form.Control type="text" placeholder="Geo Weight"/>
          </Form.Group>
          <Form.Group onChange={(e) => setHeoWeight(e.target.value)}
           className="mb-3"
           controlId="formBasicEmail">
          <Form.Label>Heo Weight in tons</Form.Label>
            <Form.Control type="text" placeholder="Heo Weight"/>
          </Form.Group>
         <Button
         >Submit</Button>

          </Form>
        </Modal.Body>
      </Modal>
      </>

      
    //   <button></button>
    //     <Col className="col-start-3 col-end-9">
    //       <Card>
    //         <Card.Title text-align="center">New Launch Vehicle</Card.Title>
    //         <Card.Body> </Card.Body>
    //         </Card>
    //           <input type='field' placeholder="Name" />
    //     <input type='field' placeholder="Cost" />
    //     <input type='field' placeholder="MEO weight in tons" />
    //     <input type='field' placeholder="LEO weight in tons" />
    //     <input type='field' placeholder="GEO weight in tons" />
    //     <input type='field' placeholder="HEO weight in tons" />

    //     </Col>
    //     <Col>
    //        <RequestList/>
    //     </Col>
    // </Row>
    // </Col>
    // </Row>

    // <Modal>

    // </Modal>
)

  
  
  // })}
  

}

