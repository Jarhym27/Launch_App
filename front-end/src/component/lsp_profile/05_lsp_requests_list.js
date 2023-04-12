import React, {useState,useEffect, useReducer} from "react";

const requestList = () =>{

  const {}

  useEffect(() =>{
  fetch('https://localhost:8080/table/launch_requests/:id')
  .then(res => res.json())
  .then(data => setLaunchRequest(data))
},[])


  return(
    <>
    <div>
      Launch Requests for {lsp.username}
      <div></div>
      <div>launch request 002</div>
      <div>launch request 003</div>
    </div>
    </>
  )
}

export default requestList;