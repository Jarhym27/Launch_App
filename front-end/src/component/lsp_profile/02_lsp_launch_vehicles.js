import React, { useState, useContext, useEffect } from "react"
import { LspDistro } from "./01_lsp_profile_page";
import { Modal, Container, Row, Col, Card, Button } from 'react-bootstrap'
import RequestList from "./05_lsp_requests_list";
import { RocketInfo } from "../../App";
export default LspLaunchVehicles ;


function LspLaunchVehicles() {
  const { userLogin, setUserLogin } = useContext(RocketInfo);
  const[getInfo ,setGetInfo ] = useState(false)
   const[launchVehicle, setLaunchVehicle] = useState([]);
    // const {launchVehicle, setLaunchVehicle} = useContext(LspDistro)
  useEffect(() => {
    fetch('http://localhost:8080/table/launch_vehicles')
      .then(res => res.json())
      .then(data => setLaunchVehicle(data))
  }, [])

  //Add a new vehicle
const addNewVehicle = (event) =>{
  fetch("http://localhost:8080/table/launch_vehicle", {
    method:"POST",
    body: JSON.stringify({
      lsp_user_id: userLogin.id,
      launch_vehicle: event.target.value
      , cost: event.target.value, 
      meo_weight: event.target.value, 
      leo_weight: event.target.value, 
      geo_weight: event.target.value, 
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  }).then(() => setGetInfo(true))
}


  //Add a new pad

const filteredVehicle = launchVehicle?.filter(element => element.lsp_user_id === userLogin.id)

return(
  <Row>
    <Col className="col-3">
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
  
    <Col >
    <Row>

      
      <button ></button>
        <Col className="col-start-3 col-end-9">
          <Card>
            <Card.Title text-align="center">New Launch Vehicle</Card.Title>
            <Card.Body> </Card.Body>
            </Card>
              <input type='field' placeholder="Name" />
        <input type='field' placeholder="Cost" />
        <input type='field' placeholder="MEO weight in tons" />
        <input type='field' placeholder="LEO weight in tons" />
        <input type='field' placeholder="GEO weight in tons" />
        <input type='field' placeholder="HEO weight in tons" />

        </Col>
        <Col>
           <RequestList/>
        </Col>
    </Row>
    </Col>
    </Row>

    // <Modal>

    // </Modal>
)

  
  
  // })}
  

}

