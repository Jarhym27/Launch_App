import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import ReviewRequest from './06_lsp_request_review'
// import LspLaunchVehicles from "./02_lsp_launch_vehicles.js";
// import LspLaunchPads from "./03_lsp_launch_pads";
// import RequestList from "./05_lsp_requests_list";
import LspCalendar from "./04_lsp_calendar";


export const LspDistro = React.createContext();

function LspProfile() {
  const navigate = useNavigate()
  const [lspUser, setLspUser] = useState(false)
  const [launchVehicle,setLaunchVehicle] = useState([])
  const [launchPad,setLaunchPad] = useState([])
  const [launchRequest, setLaunchRequest] = useState([])


  // useEffect(() => {
  //  if(lspUser === false) {
  //  return navigate('/login')
  //  //also throw up pop-up that says 'Error: you must log in first!'
  //  }})

  return (
    <>
       <LspDistro.Provider value={{launchVehicle,launchPad, setLaunchPad,setLaunchVehicle}}>
      <LspCalendar/>
      
       {/* <ReviewRequest/> */} 
      </LspDistro.Provider>
    </>
   
  )
}

export default LspProfile;
