import React from 'react';
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

function LaunchRequest() {
  // already have: payload name, payload orbit, payload weight
  // need to fill: launch date, location

  let payload = {
    payload_user_id: 2,
    name: 'ISS',
    weight: 13,
    orbit: 'LEO',
  }

  let launch_vehicles = [
    {
      name: 'Falcon 9',
      LSP: 'SpaceX',
      cost: 72,
      meo_weight: 60,
      leo_weight: 20,
      geo_weight: 12,
      heo_weight: 30,
      booked_status: ''
    },
    {
      name: 'Delta IV Heavy',
      LSP: 'ULA',
      cost: 300,
      meo_weight: 80,
      leo_weight: 40,
      geo_weight: 20,
      heo_weight: 10,
      booked_status: ''
    },
    {
      name: 'Falcon Heavy',
      LSP: 'SpaceX',
      cost: 200,
      meo_weight: 75,
      leo_weight: 45,
      geo_weight: 25,
      heo_weight: 15,
      booked_status: ''
    },
    {
      name: 'Vulcan',
      LSP: 'ULA',
      cost: 225,
      meo_weight: 82,
      leo_weight: 42,
      geo_weight: 22,
      heo_weight: 20,
      booked_status: ''
    }
  ]

  return (
    <>
      <h3>{payload.name}</h3>
      <span>Weight: {payload.weight} </span>
      <span>Orbit: {payload.orbit} </span>
      <div>Launch Pad Field</div>
      <div>Launch Date Field</div>
      <h3 className='mt-5 mb-3'>Available Launch Vehicles</h3>
      <Row xs={1} md={5} className="g-4">
        {launch_vehicles.map((LV, index) => (
          <Col key={index}>
            <Card style={{ width: '16rem' }}>
              <Card.Img className='mx-auto' variant="top" src="https://th.bing.com/th/id/OIP.I43U8c54_0BwRnHpemoZUgAAAA?pid=ImgDet&rs=1" style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{LV.name}</Card.Title>
                <Card.Text>{LV.LSP}</Card.Text>
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
              <Button variant='dark'>Book</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default LaunchRequest;