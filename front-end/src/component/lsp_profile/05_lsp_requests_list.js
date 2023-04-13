import React, {useState, useContext, useEffect} from "react";
import { LspDistro } from "./01_lsp_profile_page";


const RequestList = () =>{

  const {launchRequest, setLaunchRequest,lspUser} = useContext(LspDistro)

  useEffect(() =>{
  fetch('https://localhost:8080/table/launch_requests')
  .then(res => res.json())
  .then(data => setLaunchRequest(data))
},[])


  return(
    <>
    <div>
      Launch Requests for {lspUser.username}
      <div>Launch Request 001</div>
      <div>Launch Request 002</div>
      <div>Launch equest 003</div>
    </div>
    </>
  )
}

export default RequestList;