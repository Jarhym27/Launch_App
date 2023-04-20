import React from 'react'
import LspCalendarNew from './09_lsp_calendar_new'
import RequestList from './05_lsp_requests_list'
import {Row, Col, Container} from 'react-bootstrap'

const LSP_Home = () => {

  return (
    <>
      <Row>
        <Col md='auto'>
          <RequestList/>
        </Col>
        <Col>
          <LspCalendarNew/>
        </Col>
      </Row>
    </>
  )
}

export default LSP_Home