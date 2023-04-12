import React, {useState,useEffect} from "react";

const requestList = () =>{
  
  
  useEffect(() =>{
  fetch('https://localhost:8080/table/launch_requests/:id')
  .then(res => res.json())
  .then(data => setLaunchRequest(data))
},[])

  return(
    <>
      <div>
        
      </div>
    </>

  )
}

export default reviewrequest;