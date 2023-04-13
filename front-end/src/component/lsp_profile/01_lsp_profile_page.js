import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ReviewRequest from './06_lsp_request_review'

// import ReviewRequest from './06_lsp_request_review';



import Calendar from 'react-calendar';

function LspCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}



export const LspDistro = React.createContext();

function LspProfile() {
  const navigate = useNavigate()
  const [lspUser, setLspUser] = useState(false)
  const [launchVehicle,setLaunchVehicle] = useState()
  const [launchPad,setLaunchPad] = useState()
  const [launchRequest, setLaunchRequest] = useState()


  useEffect(() => {
    if(lspUser === false) {
    return navigate('/login')
    //also throw up pop-up that says 'Error: you must log in first!'
}})

  useEffect(() => {
    fetch('https://localhost:8080/table/:users')
      .then(res => res.json())
      .then(data => setLspUser(data))
  }, [])

  return (
    <>
        <LspProfile />
        <ReviewRequest/>
        <LspCalendar/>
    </>
   
  )
}

export default LspProfile;