import React from "react";
import "./PayloadProfile.css";
import { useState, useEffect } from "react";
import { Row, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Notifications from "./Notifications";
import { GiMoonOrbit } from 'react-icons/gi'
import "../css/vehicles.css";

function Vehicles() {

  const [allVehicles, setAllVehicles] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/table/launch_vehicles")
      .then((res) => res.json())
      .then((data) => setAllVehicles(data));
  }, []);


  let uniqueLVs = [...new Map(allVehicles?.map(vehicle => [vehicle['launch_vehicle'], vehicle])).values()]
  let totalcost = allVehicles?.map(vehicle => vehicle.cost)
  let totalleo = allVehicles?.map(vehicle => vehicle.leo_weight)

  let averageCost = totalcost?.reduce(averages) / totalcost?.length;
  let averageLeo = totalleo?.reduce(averages) / totalleo?.length;

  let costPerLeo = averageCost / averageLeo;

  function averages(total, num) {
    return total + num;
  }

  return (
    <>
      <Notifications /> 
      {console.log(allVehicles)}
      <Row id="cardsizer">
        {uniqueLVs?.map((vehicle, i) => {
          return (
            <Card id="vehiclescard" key={i} >
              <Card.Body className="payloadsCol">
                <Card.Title>{vehicle.launch_vehicle}</Card.Title>
                <hr></hr>
                <div id="vehiclepics">
                  <img src={`${vehicle.picture}`} id="bigricon" />
                  <img src={`${vehicle.icon}`} id="bigricon" />
                </div>
                <Card.Text id="vehicletext">Average Cost to Book: ${vehicle.cost}M{"  "}{vehicle.cost > averageCost ? <a style={{ color: 'red' }}>(Higher than Average)</a> : <a style={{ color: 'green' }}>(Lower than Average)</a>}</Card.Text>
                <Card.Text id="vehicletext"> Average Cost per kg: ${Math.round(vehicle.cost / vehicle.leo_weight * 1000000)} {vehicle.cost / vehicle.leo_weight > costPerLeo ? <a style={{ color: 'red' }}>(Higher than Average)</a> : <a style={{ color: 'green' }}>(Lower than Average)</a>}</Card.Text>
                <Card.Text id="vehicletext"> <GiMoonOrbit className='search-icon' />&nbsp; Low Earth Orbit Maximum Capacity:{vehicle.leo_weight > 0 ? `${vehicle.leo_weight}kg` : `N/A`}</Card.Text>
                <Card.Text id="vehicletext"> <GiMoonOrbit className='search-icon' />&nbsp; Medium Earth Orbit Maximum Capacity: {vehicle.meo_weight > 0 ? `${vehicle.meo_weight}kg` : `N/A`}</Card.Text>
                <Card.Text id="vehicletext"> <GiMoonOrbit className='search-icon' />&nbsp; Highly Elliptical Orbit Maximum Capacity: {vehicle.heo_weight > 0 ? `${vehicle.heo_weight}kg` : `N/A`}</Card.Text>
                <Card.Text id="vehicletext"> <GiMoonOrbit className='search-icon' />&nbsp; Geosynchronos Orbit Maximum Capacity: {vehicle.geo_weight > 0 ? `${vehicle.geo_weight}kg` : `N/A`}</Card.Text>
                <Card.Text id="vehicletext">{vehicle.description}</Card.Text>
                <Card.Text id="vehicletext">Learn more at &nbsp; <a href={vehicle.link}>{vehicle.link}</a></Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </>
  );
}

export default Vehicles;
