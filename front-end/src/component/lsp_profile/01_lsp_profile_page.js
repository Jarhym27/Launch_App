import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import ReviewRequest from './06_lsp_request_review'
// import LspLaunchVehicles from "./02_lsp_launch_vehicles.js";
// import LspLaunchPads from "./03_lsp_launch_pads";
import RequestList from "./05_lsp_requests_list";
import LspCalendar from "./04_lsp_calendar";
import { RocketInfo } from '../../App';



import Calendar from 'react-calendar';

export const LspDistro = React.createContext();

function LspProfile() {
  const navigate = useNavigate()
  const [payloadUsers, setPayloadUser] = useState()
  const [launchVehicles,setLaunchVehicle] = useState([])
  const [launchPads,setLaunchPad] = useState([])
  const [payloads,setPayloads] = useState([])
  const [launchRequests, setLaunchRequest] = useState([])


  // useEffect(() => {
  //   fetch('http://localhost:8080/table/launch_requests')
  //     .then(res => res.json())
  //     .then(data => setLaunchRequest(data))
  //   fetch('http://localhost:8080/table/users')
  //     .then(res => res.json())
  //     .then(data => setPayloadUser(data.filter(e => e.role === 'payload_user')))
  //   fetch('http://localhost:8080/table/launch_pads')
  //     .then(res => res.json())
  //     .then(data => setLaunchPad(data))
  //   fetch('http://localhost:8080/table/launch_vehicles')
  //     .then(res => res.json())
  //     .then(data => setLaunchVehicle(data))
  //   fetch('http://localhost:8080/join/users-payloads')
  //     .then(res => res.json())
  //     .then(data => setPayloads(data))
    
  // }, [])

  return (
    <>
      {/* <LspLaunchVehicles/> */} 
      <LspCalendar/>
       {/* <ReviewRequest/> */} 
    </>
   
  )
}

export default LspProfile;
