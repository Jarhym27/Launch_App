import { Container, Row, Col, ListGroupItem, Modal } from "react-bootstrap";
import './Home.css'
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { RocketTakeoffFill } from "react-bootstrap-icons";
import { GiMoonOrbit } from 'react-icons/gi'
import { GiEarthAmerica } from 'react-icons/gi'
import { CgBorderStyleDashed } from 'react-icons/cg'
import { useEffect, useRef, useState, useContext } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from "react-bootstrap/Spinner";
import { SiLaunchpad } from 'react-icons/si'
import { RocketInfo } from "../App";

const Home = () => {
  const { userLogin, setUserLogin } = useContext(RocketInfo);

  //tweak rocket and payload fetches and trigger refetch after booking with modal

  const siteRef = useRef();
  const padRef = useRef();
  const launchProviderRef = useRef();
  const orbitRef = useRef();
  const dateRef = useRef();

  const [launchPads, setLaunchPads] = useState(null);
  const [launchSites, setLaunchSites] = useState(null)
  const [launchProviders, setLaunchProviders] = useState(null);
  const [orbits, setOrbits] = useState(["LEO", "MEO", "GEO", "HEO"]);
  const [filter, setFilter] = useState({ "site": null, "pad": null, "provider": null, "orbit": null })
  const [search, setSearch] = useState({ "site": null, "padID": null, "lspID": null, "orbit": null })
  const [searchResults, setSearchResults] = useState(null)
  const [userPayloads, setUserPayloads] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedLV, setSelectedLV] = useState(null)
  const [selectedPayload, setSelectedPayload] = useState(null)
  const [modalShow, setModalShow] = useState(false)

  const grabPayloads = (item) => {
    fetch('http://localhost:8080/join/users-payloads')
      .then(res => res.json())
      .then(data => {
        let usersPayloads = data.filter(payload => {
          return payload.payload_user_id === userLogin.id && payload.weight <= item[payload.orbital_requirement.toLowerCase().concat('_weight').toString()]
        })
        setUserPayloads(usersPayloads)
        setSelectedLV(item)
      })
  }

  const handlePadChange = (e) => {
    setFilter({
      ...filter,
      pad: padRef.current.value,
      site: null,
      provider: null,
      orbit: null
    })
    if (padRef.current.value === '') {
      setSearch({
        ...search,
        padID: null
      })
      setUserPayloads(null)
    }
  }

  const handleSiteChange = (e) => {
    setFilter({
      ...filter,
      site: siteRef.current.value,
      pad: null,
      provider: null,
      orbit: null
    })
    if (siteRef.current.value === '') {
      setSearch({
        ...search,
        site: null
      })
      setUserPayloads(null)
    }
  }

  const handleProviderChange = (e) => {
    setFilter({
      ...filter,
      pad: null,
      site: null,
      provider: launchProviderRef.current.value,
      orbit: null
    })
    if (launchProviderRef.current.value === '') {
      setSearch({
        ...search,
        lspID: null
      })
      setUserPayloads(null)
    }
  }

  const handleOrbitChange = (e) => {
    setFilter({
      ...filter,
      pad: null,
      site: null,
      provider: null,
      orbit: orbitRef.current.value
    })
    if (orbitRef.current.value === '') {
      setSearch({
        ...search,
        orbit: null
      })
      setUserPayloads(null)
    }
  }

  const handleSelect = (e, item, ref, id) => {
    if (ref === 'padRef') {
      padRef.current.value = item
      setFilter({
        ...filter,
        pad: null
      })
      setSearch({
        ...search,
        padID: id
      })
      return
    } else if (ref === 'launchProviderRef') {
      launchProviderRef.current.value = item
      setFilter({
        ...filter,
        provider: null
      })
      setSearch({
        ...search,
        lspID: id
      })
      return
    } else if (ref === 'orbitRef') {
      orbitRef.current.value = item
      setFilter({
        ...filter,
        orbit: null
      })
      setSearch({
        ...search,
        orbit: item
      })
    } else if (ref === 'siteRef') {
      siteRef.current.value = item
      setFilter({
        ...filter,
        site: null
      })
      setSearch({
        ...search,
        site: item
      })
    }
  }

  //use effect for loading delay
  useEffect(() => {
    if (!searchResults) {
      return
    }
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchResults]);

  //use effect to gather search results
  useEffect(() => {
    if (Object.values(search).filter(item => item === null).length === 4) {
      setSearchResults(null)
      return;
    }

    const controller = new AbortController()
    fetch('http://localhost:8080/join/launch_vehicles-launch_pads', {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(data => {
        let suggestedRides = data;
        if (search.site) {
          suggestedRides = suggestedRides.filter(lvs => lvs.launch_site === search.site && lvs.booked_status === 'available')
        }
        if (search.padID) {
          suggestedRides = suggestedRides.filter(lvs => lvs.launch_pad_id === search.padID && lvs.booked_status === 'available')
        }
        if (search.lspID) {
          suggestedRides = suggestedRides.filter(lvs => lvs.lsp_user_id === search.lspID && lvs.booked_status === 'available')
        }
        if (search.orbit) {
          suggestedRides = suggestedRides.filter(lvs => lvs[search.orbit.toLowerCase().concat('_weight')] !== null && lvs.booked_status === 'available')
        }
        if (suggestedRides.length > 0) {
          setLoading(true)
          setSearchResults(suggestedRides)
        } else {
          setSearchResults(null)
        }
      })
    return () => controller.abort()
  }, [search])

  useEffect(() => {
    const controller = new AbortController()
    fetch('http://localhost:8080/join/users-launch_pads', {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(data => {
        let launchSites = data.map(pad => pad.launch_site)
        setLaunchSites([...new Set(launchSites)])
        setLaunchPads(data)
      })
      .then(whatever => { return fetch('http://localhost:8080/table/users') })
      .then(res => res.json())
      .then(data => {
        let lsps = data.filter(user => user.role === 'lsp_user')
        setLaunchProviders(lsps)
      })

    return () => controller.abort()
  }, [])

  const bookHandler = () => {
    fetch('http://localhost:8080/table/launch_requests',
      {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({
          payload_id: selectedPayload.id,
          launch_pad_id: selectedLV.launch_pad_id,
          launch_vehicle_id: selectedLV.id,
          request_status: 'Pending',
          launch_date: dateRef.current.value,
          request_cost: selectedLV.cost
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log('data:\n', data)
        // navigate('/home')
        setModalShow(false)
      })
      .catch(err => console.log(err))
  }
  
  const LaunchRequestModal = (prop) => {
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
                {selectedPayload && prop.payload.name}
              </div>
            </ListGroup.Item>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Launch Service Provider</div>
                {selectedLV && prop.vehicle.organization}
              </div>
            </ListGroup.Item>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Launch Pad</div>
                {selectedLV && selectedLV.launch_pad}
              </div>
            </ListGroup.Item>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Launch Vehicle</div>
                {selectedLV && selectedLV.launch_vehicle}
              </div>
            </ListGroup.Item>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Launch Date</div>
                <Form>
                  <Form.Group controlId="duedate">
                    <Form.Control  ref={dateRef} type="date" name="duedate" placeholder="Launch date" />
                  </Form.Group>
                </Form>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup className='mt-3'>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Cost</div>
                {selectedLV && selectedLV.cost}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
          <Button onClick={() => bookHandler(prop)}>Book</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <div className='home-container'>
      <Container>
        <Row className='py-3'>
          <Col>
            <Row className='mb-3'>
              <Col className='pick-up-container'>
                <Card className='card-container'>
                  <Card.Body>
                    <Card.Title className='card-title'>Where can we pick you up?</Card.Title>
                    <Form>
                      <InputGroup onChange={(e) => handleSiteChange(e)} className="mb-1">
                        <InputGroup.Text id="basic-addon1"><GiEarthAmerica /></InputGroup.Text>
                        <Form.Control
                          ref={siteRef}
                          placeholder="Launch Site"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                      {filter.site && siteRef.current.value &&
                        <ListGroup className='suggestions-list' variant="flush">
                          {
                            launchSites.filter(site => site.toLowerCase().includes(siteRef.current.value.toLowerCase())).map((item, index) =>
                              <ListGroupItem key={index} onClick={(e) => handleSelect(e, item, "siteRef")} className='suggestion'>{item}</ListGroupItem>
                            )
                          }
                          {launchPads.filter(pad => pad.launch_site.toLowerCase().includes(siteRef.current.value.toLowerCase())).length === 0 && <ListGroupItem className='suggestion'>No results</ListGroupItem>}
                        </ListGroup>
                      }
                      <CgBorderStyleDashed className='line-dash' />
                      <InputGroup onChange={(e) => handlePadChange(e)} className="mb-1">
                        <InputGroup.Text id="basic-addon1"><SiLaunchpad /></InputGroup.Text>
                        <Form.Control
                          ref={padRef}
                          placeholder="Launch Pad"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                      {filter.pad && padRef.current.value &&
                        <ListGroup className='suggestions-list' variant="flush">
                          {
                            launchPads.filter(pad => pad.launch_pad.toLowerCase().includes(padRef.current.value.toLowerCase())).map(item =>
                              <ListGroupItem key={item.id} onClick={(e) => handleSelect(e, item.launch_pad, "padRef", item.id)} className='suggestion'>{item.launch_pad} | {item.launch_site} | {item.organization}</ListGroupItem>
                            )
                          }
                          {launchPads.filter(pad => pad.launch_pad.toLowerCase().includes(padRef.current.value.toLowerCase())).length === 0 && <ListGroupItem className='suggestion'>No results</ListGroupItem>}
                        </ListGroup>
                      }
                      <CgBorderStyleDashed className='line-dash' />
                      <InputGroup onChange={(e) => handleProviderChange(e)} className="mb-1">
                        <InputGroup.Text id="basic-addon1"><RocketTakeoffFill /></InputGroup.Text>
                        <Form.Control
                          ref={launchProviderRef}
                          placeholder="Launch Provider"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                      {filter.provider && launchProviderRef.current.value &&
                        <ListGroup className='suggestions-list' variant="flush">
                          {
                            launchProviders.filter(lsps => lsps.organization.toLowerCase().includes(launchProviderRef.current.value.toLowerCase())).map(item =>
                              <ListGroupItem key={item.id} onClick={(e) => handleSelect(e, item.organization, "launchProviderRef", item.id)} className='suggestion'>{item.organization}</ListGroupItem>
                            )
                          }
                          {launchProviders.filter(lsps => lsps.organization.toLowerCase().includes(launchProviderRef.current.value.toLowerCase())).length === 0 && <ListGroupItem className='suggestion'>No results</ListGroupItem>}
                        </ListGroup>
                      }
                      <CgBorderStyleDashed className='line-dash' />
                      <InputGroup onChange={(e) => handleOrbitChange(e)} className="mb-1">

                        <InputGroup.Text id="basic-addon1"><GiMoonOrbit /></InputGroup.Text>
                        <Form.Control
                          ref={orbitRef}
                          placeholder="Desired Orbit"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                      {filter.orbit && orbitRef.current.value &&
                        <ListGroup className='suggestions-list' variant="flush">
                          {
                            orbits.filter(orbit => orbit.toLowerCase().includes(orbitRef.current.value.toLowerCase())).map(item =>
                              <ListGroupItem key={item.id} onClick={(e) => handleSelect(e, item, "orbitRef")} className='suggestion'>{item}</ListGroupItem>
                            )
                          }
                          {orbits.filter(orbit => orbit.toLowerCase().includes(orbitRef.current.value.toLowerCase())).length === 0 && <ListGroupItem className='suggestion'>No results</ListGroupItem>}
                        </ListGroup>
                      }
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {loading && <Spinner variant="light" />}
            {!loading && searchResults &&
              <Row>
                <Col className='pick-up-container'>
                  <Card className='card-container'>
                    <ListGroup className='search-listgroup' variant="flush">
                      {
                        searchResults.map(item =>
                          <ListGroupItem className='search-list-item' key={item.id}>
                            <Row>
                              <Col >
                                <img
                                  className=""
                                  src="http://via.placeholder.com/100x80"
                                  alt="Card placeholder"
                                />
                              </Col>
                              <Col md={6} lg={6}>
                                <Row>
                                  <h5>
                                    {item.launch_vehicle}
                                  </h5>
                                </Row>
                                <Row>
                                  <h6 className='list-detail'>
                                    {item.launch_site}
                                  </h6>
                                </Row>
                                <Row>
                                  <h6 className='list-detail'>
                                    ${item.cost} million
                                  </h6>
                                </Row>
                                <Row>
                                  <h6 className='list-detail'>
                                    Capacity - LEO: {item.leo_weight} MEO: {item.meo_weight} GEO {item.geo_weight} HEO {item.heo_weight}
                                  </h6>
                                </Row>
                              </Col>
                              <Col>
                                <RocketTakeoffFill onClick={() => grabPayloads(item)} className='search-rocket' /></Col>
                            </Row>
                          </ListGroupItem>
                        )
                      }
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            }
          </Col>
          {userPayloads &&
            <Col className='available-payloads-container'>
              <h2 className='payloads-title'>Available Payloads</h2>
              <Card className='payloads-card-container'>
                <ListGroup className='payload-listgroup' variant="flush">
                  {
                    userPayloads.map(item =>
                      <ListGroupItem className='payload-list-item' key={item.id}>
                        <Row>
                          <Col >
                            <img
                              className=""
                              src="http://via.placeholder.com/100x80"
                              alt="Card placeholder"
                            />
                          </Col>
                          <Col md={6} lg={6}>
                            <Row>
                              <h5>
                                {item.name}
                              </h5>
                            </Row>
                            <Row>
                              <h6 className='list-detail'>
                                {item.organization}
                              </h6>
                            </Row>
                            <Row>
                              <h6 className='list-detail'>
                                Weight: {item.weight}
                              </h6>
                            </Row>
                            <Row>
                              <h6 className='list-detail'>
                                Target Orbit: {item.orbital_requirement}
                              </h6>
                            </Row>
                          </Col>
                          <Col>
                            <RocketTakeoffFill onClick={() => {
                              if (!selectedPayload && !selectedLV) return
                              else {
                                setSelectedPayload(item)
                                setModalShow(true)
                              }
                            }}
                              className='search-rocket' /></Col>

                        </Row>
                      </ListGroupItem>
                    )
                  }
                </ListGroup>
              </Card>
            </Col>
          }
        </Row>
        <LaunchRequestModal payload={selectedPayload} vehicle={selectedLV} show={modalShow} onHide={() => setModalShow(false)} />
      </Container>
    </div>
  );
}

export default Home;