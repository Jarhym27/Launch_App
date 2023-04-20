import React from 'react'
import LspCalendar from './04_lsp_calendar'
import RequestList from './05_lsp_requests_list'
import {Row, Col, Container} from 'react-bootstrap'
import Notifications from '../Notifications';

const LSP_Home = () => {

  return (
    <>
      <Notifications/>
      <Row className='gx-0 my-3'>
        <Col className='mx-3' md='auto'>
          <RequestList/>
        </Col>
        <Col>
          <LspCalendar/>
        </Col>
      </Row>
    </>
  )
}

export default LSP_Home