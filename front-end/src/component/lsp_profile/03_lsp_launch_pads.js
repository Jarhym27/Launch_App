import React, { useState, useContext, useEffect } from "react"
import { LspDistro } from "./01_lsp_profile_page"
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

import './00_lsp_profile.css'
export default LspLaunchPads

function LspLaunchPads() {
  const { launchPad, setLaunchPad } = useContext(LspDistro)

  useEffect(() => {
    fetch('http://localhost:8080/join/launch_requests')
      .then(res => res.json())
      .then(data => setLaunchPad(data))
  }, [])


  const availablePads = launchPad?.filter((element) => element.booked_status !== "booked")

  return (
    <Row>
      <Col className="col-3">
    <h1>Launch Pads</h1> 
    <Button> Add Pads</Button>
      {availablePads?.map((pads, i) => {
        return (
          <Card key={i} >
            <Card.Body>
              <Card.Title>
              </Card.Title>
              <Card.Text>
                Pad: {pads.launch_pad}
              </Card.Text>

              {/* <div>add New Pad</div> */}
            </Card.Body>
          </Card>

        )
      })}</Col>
      </Row>)
}
