import React, {  useContext, useEffect } from "react"
import { LspDistro } from "./01_lsp_profile_page";
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import RequestList from "./05_lsp_requests_list";
export default LspLaunchVehicles ;


function LspLaunchVehicles() {

    const {launchVehicle, setLaunchVehicle} = useContext(LspDistro)
  useEffect(() => {
    fetch('http://localhost:8080/table/launch_vehicles')
      .then(res => res.json())
      .then(data => setLaunchVehicle(data))
  }, [])


const filteredVehicle = launchVehicle?.filter(element => element.booked_status !== "booked")

return(
  <Row>
    <Col className="col-3">
      <Card>
      <Card.Title>
        Launch Vehicle
        <Button>Add Vehicle</Button>
      </Card.Title>
      {filteredVehicle?.map((vehicle, j) =>{
       return ( <Card.Body key={j}>
       <Card.Text>
       ID: {vehicle.id}
       <br></br>
       Rocket: {vehicle.launch_vehicle} 


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
)

  
  
  // })}
  

}

