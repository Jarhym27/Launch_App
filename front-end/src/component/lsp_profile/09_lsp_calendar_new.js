import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./000_calendar.css"
import { Modal, ListGroup, Form, Card, Row, Container } from "react-bootstrap"
import moment from 'moment'
import { RocketInfo } from "../../App";
import { RocketTakeoffFill, RocketFill } from "react-bootstrap-icons";

const localizer = momentLocalizer(moment)

function LspCalendarNew() {
    const { userLogin, myRequests } = useContext(RocketInfo)
    const [newEvent, setNewEvent] = useState({ title: "", vehicle: "", pad: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({ title: "", city: "", state: "", cost: "", launch_site: "", launch_pad: "", launch_date: "", launch_vehicle: "" })

    useEffect(() => {
        fetch('http://localhost:8080/join/launch_requests')
            .then(res => res.json())
            .then(data => {
                let events = data.filter(event => (event.request_status === 'Scheduled' || event.request_status === 'Launched') && event.organization === userLogin.organization)
                events.forEach(event => event['title'] = event.name)
                setAllEvents(events)
            })
    }, [myRequests])

    // console.log('allEvents:\n', allEvents)

    const CalendarModal = (prop) => {
        return (
            <Modal
                {...prop}
                aria-labelledby='container-modal-title-vcenter'
                keyboard={true}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedEvent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                            <div className="ms-2 me-auto">
                                <div className='fw-bold'>Launch Vehicle</div>
                                {selectedEvent.launch_vehicle}</div>
                        </ListGroup.Item>
                        <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                            <div className="ms-2 me-auto">
                                <div className='fw-bold'>Launch Location</div>
                                {selectedEvent.city}, {selectedEvent.state} </div>
                        </ListGroup.Item>
                        <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                            <div className="ms-2 me-auto">
                                <div className='fw-bold'>Launch Site</div>
                                {selectedEvent.launch_site}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                            <div className="ms-2 me-auto">
                                <div className='fw-bold'>Launch Pad</div>
                                {selectedEvent.launch_pad}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                            <div className="ms-2 me-auto">
                                <div className='fw-bold'>Contract Price</div>
                                $ {selectedEvent.cost}M
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                            <div className="ms-2 me-auto">
                                <div className='fw-bold'>Status</div>
                                {selectedEvent.request_status}</div>
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
            </Modal>
        )
    }

    if (allEvents) {
        return (
            <div >
                {/* <React.Fragment >
                    <LspLaunchVehicles />
                    <LspLaunchPads />
                </React.Fragment> */}
                <Container>
                    <Card>
                        <Card.Title className='center' style={{ display: 'flex', justifyContent: "center" }}>Launch Schedule</Card.Title>
                        <Row>
                            <Card.Subtitle style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className='mx-3' style={{ display:'flex', alignItems:'center'}}>
                                    <RocketTakeoffFill color="green" />
                                    <span className='mx-2'>Launched  |</span>
                                    <RocketFill color="blue" />
                                    <span className='mx-2'>Scheduled</span>
                                </div>
                            </Card.Subtitle>
                        </Row>
                        <Calendar
                            selectable={true}
                            localizer={localizer}
                            events={allEvents}
                            eventContent={allEvents}
                            startAccessor="launch_date"
                            endAccessor="launch_date"
                            style={{ height: 500, margin: "25px" }}
                            onShowMore={(events, date) => this.setState({ showModal: true, events })}
                            onSelectEvent={(e) => { setModalShow(true); setSelectedEvent(e) }}
                            eventPropGetter={(event) => {
                                const backgroundColor = event.request_status === 'Launched' ? 'green' : 'blue';
                                return { style: { backgroundColor } }
                            }} />
                    </Card>
                </Container>
                <CalendarModal show={modalShow} onHide={() => setModalShow(false)} />
            </div>
        );
    }
}
export default LspCalendarNew;