import { Container, Row, Col, ListGroupItem } from "react-bootstrap";
import './Home.css'
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { RocketTakeoffFill } from "react-bootstrap-icons";
import { GiMoonOrbit } from 'react-icons/gi'
import { GiEarthAmerica } from 'react-icons/gi'
import { CgBorderStyleDashed } from 'react-icons/cg'
import { useEffect, useRef, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from "react-bootstrap/Spinner";

const Home = () => {

  const locationRef = useRef();
  const launchProviderRef = useRef();
  const orbitRef = useRef();

  const [launchPads, setLaunchPads] = useState(null);
  const [launchProviders, setLaunchProviders] = useState(null);
  const [orbits, setOrbits] = useState(["LEO", "MEO", "GEO", "HEO"]);
  const [filter, setFilter] = useState({ "pad": null, "provider": null, "orbit": null })
  const [search, setSearch] = useState({ "padID": null, "lspID": null, "orbit": null })
  const [searchResults, setSearchResults] = useState(null)
  const [loading,setLoading] = useState(false)

  const handleLocationChange = (e) => {
    setFilter({
      ...filter,
      pad: locationRef.current.value,
      provider: null,
      orbit: null
    })
    setSearchResults(null)
  }

  const handleProviderChange = (e) => {
    setFilter({
      ...filter,
      pad: null,
      provider: launchProviderRef.current.value,
      orbit: null
    })
    setSearchResults(null)
  }

  const handleOrbitChange = (e) => {
    setFilter({
      ...filter,
      pad: null,
      provider: null,
      orbit: orbitRef.current.value
    })
    setSearchResults(null)
  }

  const handleSelect = (e, item, ref, id) => {
    if (ref === 'locationRef') {
      locationRef.current.value = item
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
    }
  }

  //use effect for loading delay
  useEffect(() => {
    if(!searchResults) {
      return
    }
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchResults]);

  useEffect(() => {
    if (!search.orbit || !search.lspID || !search.padID) { return }
    const controller = new AbortController()
    fetch('http://localhost:8080/table/launch_vehicles', {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(data => {
        let suggestedRides = data.filter(lvs => lvs.lsp_user_id === search.lspID && lvs.launch_pad_id === search.padID && lvs.booked_status === 'available' && lvs[search.orbit.toLowerCase().concat('_weight')] !== null)
        if(suggestedRides.length>0){
          setSearchResults(suggestedRides)
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

  return (
    <div className='home-container'>
      <Container>
        <Row className='py-5'>
          <Col className='pick-up-container'>
            <Card className='card-container'>
              <Card.Body>
                <Card.Title className='card-title'>Where can we pick you up?</Card.Title>
                <Form>
                  <InputGroup onChange={(e) => handleLocationChange(e)} className="mb-2">
                    <InputGroup.Text id="basic-addon1"><GiEarthAmerica /></InputGroup.Text>
                    <Form.Control
                      ref={locationRef}
                      placeholder="Launch Pad"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  {filter.pad && locationRef.current.value &&
                    <ListGroup className='suggestions-list' variant="flush">
                      {
                        launchPads.filter(pad => pad.launch_pad.toLowerCase().includes(locationRef.current.value.toLowerCase())).map(item =>
                          <ListGroupItem key={item.id} onClick={(e) => handleSelect(e, item.launch_pad, "locationRef", item.id)} className='suggestion'>{item.launch_pad} | {item.launch_site} | {item.organization}</ListGroupItem>
                        )
                      }
                      {launchPads.filter(pad => pad.launch_pad.toLowerCase().includes(locationRef.current.value.toLowerCase())).length === 0 && <ListGroupItem className='suggestion'>No results</ListGroupItem>}
                    </ListGroup>
                  }
                  <CgBorderStyleDashed className='line-dash' />
                  <InputGroup onChange={(e) => handleProviderChange(e)} className="mb-2">
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
                  <InputGroup onChange={(e) => handleOrbitChange(e)} className="mb-2">

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
        <Row>
        <Col>
            {loading && <Spinner variant="light" />}
            {!loading && searchResults && orbitRef.current.value && locationRef.current.value && launchProviderRef.current.value &&
            <Row>
              <Col>
              <Card className='card-container'>
                <ListGroup variant="flush">
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
                                ${item.cost} million
                              </h6>
                            </Row>
                            <Row>
                              <h6 className='list-detail'>
                                Weight to {orbitRef.current.value} {item[search.orbit.toLowerCase().concat('_weight')]}
                              </h6>
                            </Row>
                            <Row>
                              <h6 className='list-detail'>
                                LV current as of {item.updated_at.slice(0, 10)}
                              </h6>
                            </Row>
                          </Col>
                          <Col>
                            <RocketTakeoffFill className='search-rocket' /></Col>
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
        </Row>
      </Container>
    </div>
  );
}

export default Home;