import { React, useEffect, useState } from 'react';
import { Row, Col, Card, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar'

function LaunchRequest() {
  // already have: payload name, payload orbit, payload weight
  // need to fill: launch date, location
  const [vehicles, setVehicles] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [launchpads, setLaunchpads] = useState([])
  const [padID, setPadID] = useState('')
  let location = useLocation();
  let payload = location.state
  // console.log('payload:\n', payload)

  // let payload = {
  //   id: 2,
  //   payload_user_id: 2,
  //   name: 'ISS',
  //   weight: 13,
  //   orbit: 'LEO',
  // }

  useEffect(() => {
    fetch('http://localhost:8080/join/users-launch_vehicles')
      .then(res => res.json())
      .then(data => {
        // console.log('data:\n', data)
        let available_vehicles = data.filter(LV => LV.booked_status === 'available')
        setVehicles(available_vehicles)
      })
    fetch('http://localhost:8080/table/launch_pads')
      .then(res => res.json())
      .then(data => setLaunchpads(data))
  }, [])

  // console.log('vehicles:\n', vehicles)
  // console.log('launchpads:\n', launchpads)

  // Post to launch_requests table
  // payload_id, launch_pad_id, launch_vehicle_id, request_status, launch_date, request_cost
  function LaunchRequestModal(prop) {
    return (
      <Modal
        {...prop}
        aria-labelledby='container-modal-title-vcenter'
        backdrop='static'
        keyboard={false}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Launch Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Payload</div>
                {prop.payload.name}
              </div>
            </ListGroup.Item>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Payload ID</div>
                {prop.payload.id}
              </div>
            </ListGroup.Item>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Launch Service Provider</div>
                {prop.vehicle.organization}
              </div>
            </ListGroup.Item>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Launch Pad ID</div>
                'Insert Launch Pad ID'
              </div>
            </ListGroup.Item>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Launch Pad</div>
                'Insert Launch Pad'
              </div>
            </ListGroup.Item>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Launch Vehicle ID</div>
                {prop.vehicle.id}
              </div>
            </ListGroup.Item>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Launch Vehicle</div>
                {prop.vehicle.launch_vehicle}
              </div>
            </ListGroup.Item>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Launch Date</div>
                `Insert Launch Date`
              </div>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup className='mt-3'>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Cost</div>
                {prop.vehicle.cost}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='dark' onClick={() => setModalShow(false)}>Close</Button>
          <Button variant='dark' onClick={() => console.log('prop:\n', prop)}>Book</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  function padChange(event){
    setPadID(event.target.value)
  }

  return (
    <>
      <h3>{payload.name}</h3>
      <span>Weight: {payload.weight} </span>
      <span>Orbit: {payload.orbital_requirement} </span>
      <Form.Select aria-label="Default select example" value={padID} onChange={event=>setPadID(event.target.value)}>
        <option value='' disabled>Launch Pads</option>
      {launchpads.map((pad, index) => (
        <option key={index} value={pad.id} >{pad.launch_pad}</option>
      ))}
    </Form.Select>
      <div>Launch Date Field</div>

      <h3 className='mt-5 mb-3'>Available Launch Vehicles</h3>
      <Row xs={1} md={5} className="g-4">
        {vehicles.map((LV, index) => (
          <Col key={index}>
            <Card style={{ width: '16rem' }}>
              <Card.Img className='mx-auto' variant="top" src="https://th.bing.com/th/id/OIP.I43U8c54_0BwRnHpemoZUgAAAA?pid=ImgDet&rs=1" style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{LV.launch_vehicle}</Card.Title>
                <Card.Text>{LV.organization}</Card.Text>
                <Card.Text>LV ID: {LV.id}</Card.Text>
              </Card.Body>
              <ListGroup className='list-group-flush'>
                <ListGroup.Item>
                  <p>MEO: {LV.meo_weight} kg</p>
                  <p>LEO: {LV.leo_weight} kg</p>
                  <p>GEO: {LV.geo_weight} kg</p>
                  <p>HEO: {LV.heo_weight} kg</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  Cost: ${LV.cost} M
                </ListGroup.Item>
              </ListGroup>
              <Button variant='dark' onClick={() => setModalShow(true)}>Book</Button>
              <LaunchRequestModal payload={payload} vehicle={LV} show={modalShow} onHide={() => setModalShow(false)} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default LaunchRequest;