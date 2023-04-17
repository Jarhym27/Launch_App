import React, { useEffect } from 'react'
import { useState } from 'react'
import { json } from 'react-router';
import { RocketInfo } from "../App";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Notifications() {
const [notifs, setNotifs] = useState();
const [showA, setShowA] = useState(true);
const [payloads, setPayloads] =useState();

//Close TOASTS
const toggleShowA = () => setShowA(!showA);

useEffect(() => {
    fetch("http://localhost:8080/join/launch_requests")
    .then(res => res.json())
    .then(data => setNotifs(data))
}, [])
useEffect(() => {
    fetch("http://localhost:8080/table/payloads")
      .then((res) => res.json())
      .then((data) => setPayloads(data));
  }, []);

  console.log('here', notifs)

//   let updatedTime = notifs?.map((e) => {
//     return new Date(e.updated_at).valueOf()
//   })

//   let createdTime = notifs?.map((e) => {
//     return new Date(e.created_at).valueOf()
//   })

//   console.log('update', updatedTime)

let newUpdate = notifs?.filter((e, i) => (new Date(e.updated_at).valueOf()) >  (new Date(e.created_at).valueOf()))
 
console.log('test right HERE ', newUpdate)

  return (
    <ToastContainer>
    <Toast show={showA} onClose={toggleShowA}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto"> Launch Request Update</strong>
        <small className="text-muted">(maybe use timestamp here)</small>
      </Toast.Header>
      <Toast.Body>{newUpdate?.map((update, i) =>{
        return(
                
           <span key={i}>Payload:{update.name} status has been changed to {update.request_status}</span>
        )
      })}
      </Toast.Body>
    </Toast>
  </ToastContainer>
  )
}

export default Notifications