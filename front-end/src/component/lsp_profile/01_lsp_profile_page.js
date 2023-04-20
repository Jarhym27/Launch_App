import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LspLaunchVehicles from "./02_lsp_launch_vehicles"
import LspLaunchPads from "./03_lsp_launch_pads";
import { RocketInfo } from '../../App';



import Calendar from 'react-calendar';
import Notifications from '../Notifications';

export const LspDistro = React.createContext();

function LspProfile() {
  const navigate = useNavigate()
  const [payloadUsers, setPayloadUser] = useState()
  const [launchVehicles,setLaunchVehicle] = useState([])
  const [launchPads,setLaunchPad] = useState([])
  const [payloads,setPayloads] = useState([])
  const [launchRequests, setLaunchRequest] = useState([])


  return (
    <>
        <Notifications/>
        <LspLaunchVehicles/>
        <LspLaunchPads/>
    </>

  )
}

export default LspProfile;
