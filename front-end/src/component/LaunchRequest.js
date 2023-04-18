import { Container, Row, Col, ListGroupItem, Modal } from "react-bootstrap";
import './Home.css'
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { RocketTakeoffFill } from "react-bootstrap-icons";
import { GiEarthAmerica } from 'react-icons/gi'
import { CgBorderStyleDashed } from 'react-icons/cg'
import { useEffect, useRef, useState, useContext } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from "react-bootstrap/Spinner";
import { SiLaunchpad } from 'react-icons/si'
import { RocketInfo } from "../App";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const LaunchRequest = () => {
  const { userLogin } = useContext(RocketInfo);
  let location = useLocation();

  const siteRef = useRef();
  const padRef = useRef();
  const launchProviderRef = useRef();
  const dateRef = useRef();
  const messageRef = useRef();

  const navigate = useNavigate();


  const [launchPads, setLaunchPads] = useState(null);
  const [launchSites, setLaunchSites] = useState(null)
  const [launchProviders, setLaunchProviders] = useState(null);
  const [filter, setFilter] = useState({ "site": null, "pad": null, "provider": null})
  const [search, setSearch] = useState({ "site": null, "padID": null, "lspID": null})
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedLV, setSelectedLV] = useState(null)
  const [modalShow, setModalShow] = useState(false)

  const handlePadChange = (e) => {
    setFilter({
      ...filter,
      pad: padRef.current.value,
      site: null,
      provider: null,
    })
    if (padRef.current.value === '') {
      setSearch({
        ...search,
        padID: null
      })
    }
  }

  const handleSiteChange = (e) => {
    setFilter({
      ...filter,
      site: siteRef.current.value,
      pad: null,
      provider: null,
    })
    if (siteRef.current.value === '') {
      setSearch({
        ...search,
        site: null
      })
    }
  }

  const handleProviderChange = (e) => {
    setFilter({
      ...filter,
      pad: null,
      site: null,
      provider: launchProviderRef.current.value,
    })
    if (launchProviderRef.current.value === '') {
      setSearch({
        ...search,
        lspID: null
      })
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
    if (Object.values(search).filter(item => item === null).length === 3) {
      setSearchResults(null)
      return;
    }

    const controller = new AbortController()
    let suggestedRides = []
    fetch('http://localhost:8080/join/launch_vehicles-launch_pads', {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(data => {
        suggestedRides = data.filter(rocket => rocket[location.state.orbital_requirement.toLowerCase().concat('_weight')] >= location.state.weight);
        if (search.site) {
          suggestedRides = suggestedRides.filter(lvs => lvs.launch_site === search.site && lvs.booked_status === 'available')
        }
        if (search.padID) {
          suggestedRides = suggestedRides.filter(lvs => lvs.launch_pad_id === search.padID && lvs.booked_status === 'available')
        }
        if (search.lspID) {
          suggestedRides = suggestedRides.filter(lvs => lvs.lsp_user_id === search.lspID && lvs.booked_status === 'available')
        }
        return (fetch('http://localhost:8080/join/launch_requests'))
      })
      .then(res =>res.json())
      .then(requestData => {
        let copy = JSON.parse(JSON.stringify(suggestedRides))
        for(let i=0;i<copy.length;i++){
          for(let j=0;j<requestData.length;j++){
            if(copy[i] && copy[i].id === requestData[j].launch_vehicle_id && requestData[j].payload_user_id === userLogin.id){
              delete copy[i]
            }
          }
        }

        suggestedRides = copy.filter(val=>val)

        if (suggestedRides.length > 0) {
          setLoading(true)
          setSearchResults(suggestedRides)
        } else {
          setLoading(true)
          setSearchResults([])
        }
          return requestData
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
    if(!dateRef.current.value) return;
    fetch('http://localhost:8080/table/launch_requests',
      {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({
          payload_id: location.state.id,
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
        let newRequestID = data[0].id
        return(fetch('http://localhost:8080/table/messages',
        {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify({
            sender_id: userLogin.id,
            recipient_id: selectedLV.lsp_user_id,
            launch_request_id: newRequestID,
            message: messageRef.current.value,
            notification_type: "New request",
            notification_ack: 'false'
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }))})
      .then(res=>res.json())
      .then(data=>{
        setModalShow(false)
        navigate('/payloadprofile')
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
                {prop.payload.name}
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
                    <Form.Control ref={dateRef} type="date" name="duedate" placeholder="Launch date" />
                  </Form.Group>
                  <div className='fw-bold'>Include a message (optional)</div>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label></Form.Label>
                    <Form.Control ref={messageRef} as="textarea" rows={3} />
                  </Form.Group>
                </Form>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup className='mt-3'>
            <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Cost</div>
                ${selectedLV && selectedLV.cost} million
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
        <Row>
          <Col md={6} lg={6}>
            <Card className='payloads-card-container'>
              <ListGroup variant="flush">
                <ListGroupItem className='payload-list-item'>
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
                          {location.state.name}
                        </h5>
                      </Row>
                      <Row>
                        <h6 className='list-detail'>
                          Weight: {location.state.weight}
                        </h6>
                      </Row>
                      <Row>
                        <h6 className='list-detail'>
                          Target Orbit: {location.state.orbital_requirement}
                        </h6>
                      </Row>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row className='py-3'>
          <Col>
            <Row className='mb-3'>
              <Col className='pick-up-container'>
                <Card className='card-container'>
                  <Card.Body>
                    <Card.Title className='card-title'>Where can we pick you up?</Card.Title>
                    <Form>
                      <Row>
                        <InputGroup onChange={(e) => handleSiteChange(e)} className="mb-1">
                          <InputGroup.Text id="basic-addon1"><GiEarthAmerica className='search-icon' /></InputGroup.Text>
                          <Col md={9} lg={9} className='search-field-container'>
                            <Form.Control
                              className='search-field'
                              ref={siteRef}
                              placeholder="Launch Site"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                          </Col>
                          <Col className='dropdown-field'>
                            <DropdownButton id="dropdown-basic-button" drop={'start'} title="">
                              {launchSites && launchSites.map(site =>
                                <Dropdown.Item onClick={(e) => handleSelect(e, site, "siteRef")}>{site}</Dropdown.Item>
                              )}
                            </DropdownButton>
                          </Col>
                        </InputGroup>
                      </Row>
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
                      <Row>
                        <InputGroup onChange={(e) => handlePadChange(e)} className="mb-1">
                            <InputGroup.Text id="basic-addon1"><SiLaunchpad  className='search-icon'/></InputGroup.Text>
                          <Col md={9} lg={9} className='search-field-container'>
                            <Form.Control
                              className='search-field'
                              ref={padRef}
                              placeholder="Launch Pad"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                          </Col>
                          <Col className='dropdown-field'>
                            <DropdownButton id="dropdown-basic-button" drop={'start'} title="">
                              {launchPads && launchPads.map(pad =>
                                <Dropdown.Item onClick={(e) => handleSelect(e, pad.launch_pad, "padRef", pad.id)}>{pad.launch_pad}</Dropdown.Item>
                              )}
                            </DropdownButton>
                          </Col>
                        </InputGroup>
                      </Row>
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
                      <Row>
                      <InputGroup onChange={(e) => handleProviderChange(e)} className="mb-1">
                        <InputGroup.Text id="basic-addon1"><RocketTakeoffFill className='search-icon' /></InputGroup.Text>
                        <Col md={9} lg={9} className='search-field-container'>
                          <Form.Control
                            className='search-field'
                            ref={launchProviderRef}
                            placeholder="Launch Provider"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </Col>
                        <Col className='dropdown-field'>
                            <DropdownButton id="dropdown-basic-button" drop={'start'} title="">
                              {launchProviders && launchProviders.map(item =>
                                <Dropdown.Item onClick={(e) => handleSelect(e, item.organization, "launchProviderRef", item.id)}>{item.organization}</Dropdown.Item>
                              )}
                            </DropdownButton>
                          </Col>
                      </InputGroup>
                      </Row>
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
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {loading && <Spinner variant="light" />}
            {!loading && Array.isArray(searchResults) && searchResults.length > 0 &&
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
                              <Col md={3} lg={3}>
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
                              </Col>
                              <Col md={4} lg={4}>
                                <Row>
                                    <h6 className='list-detail'>
                                    Capacity
                                    </h6>
                                    <ul className='list-detail'>
                                      <li>{item.leo_weight && `LEO: ${item.leo_weight}kg `}  </li>
                                      <li>{item.meo_weight && `MEO: ${item.meo_weight}kg `} </li>
                                      <li>{item.geo_weight && `GEO: ${item.geo_weight}kg `}</li>
                                      <li>{item.heo_weight && `HEO: ${item.heo_weight}kg `}</li>
                                    </ul>
                                  </Row>
                              </Col>
                              <Col>
                                <RocketTakeoffFill onClick={() => {
                                  setSelectedLV(item)
                                  setModalShow(true)
                                }} className='search-rocket' /></Col>
                            </Row>
                          </ListGroupItem>
                        )
                      }
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            }
            {!loading && Array.isArray(searchResults) && searchResults.length === 0 &&
              <Row>
                <Col className='pick-up-container'>
                  <Card className='card-container'>
                    <h2> No available rockets </h2>
                  </Card>
                </Col>
              </Row>
            }
          </Col>
        </Row>
        <LaunchRequestModal payload={location.state} vehicle={selectedLV} show={modalShow} onHide={() => setModalShow(false)} />
      </Container>
    </div>
  );
}

export default LaunchRequest;