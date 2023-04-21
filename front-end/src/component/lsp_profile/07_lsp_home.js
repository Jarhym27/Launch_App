import React from 'react'
import LspCalendar from './04_lsp_calendar'
import RequestList from './05_lsp_requests_list'
import {Row, Col, Container} from 'react-bootstrap'
import Notifications from '../Notifications';

const LSP_Home = () => {
  // Put each request into its own card

  return (
    <div className='lsp-home-container'>
      <Notifications/>
      <Row className='gx-0 my-3'>
        <Col className='mx-3 request-list-col' md={4} lg={4}>
          <RequestList/>
        </Col>
        <Col>
          <LspCalendar/>
        </Col>
      </Row>
    </div >
  )
}

export default LSP_Home