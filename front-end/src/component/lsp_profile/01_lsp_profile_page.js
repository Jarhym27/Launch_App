import React, { useState, useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import lspReview from './06_lsp_request_review'

export const LSP_distro = React.createContext();

function LSP_Profile() {
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
    fetch('https://localhost:8080/table/users')
      .then(res => res.json())
      .then(data => setLspuser(data))
  }, [])

  return (
    <Distibution.Provider value={{ lspuser, setLspuser }}>
      <Routes>
        <Route path='/LSP_profile' element={<LSP_Profile />} />
        <Route path='/LSP_profile/reviewrequest/:requestid' element={<lspReview />} />
      </Routes>
    </Distibution.Provider>
  )
}

// export default LSP_Profile;