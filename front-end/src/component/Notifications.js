import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { RocketInfo } from "../App";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Link } from 'react-router-dom';

const moment = require('moment')

function Notifications() {
const [notifs, setNotifs] = useState();
const [toastBools, setToastBools] = useState();
const {userLogin} = useContext(RocketInfo)

//Close TOASTS
const toggleShowA = (index,message_id) => {
  fetch(`http://localhost:8080/table/messages?id=${message_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        notification_ack: "true"
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res=>{
      console.log(res)
      if(res.status===200){
        let newBools = JSON.parse(JSON.stringify(toastBools))
        newBools[index] = !newBools[index]
        setToastBools(newBools)
      }
    })
    
};


useEffect(() => {
  if(userLogin.role === 'payload_user'){
    fetch("http://localhost:8080/join/payload_user_messages")
      .then(res =>res.json())
      .then(data => {
        let myNotifications = data.filter(msg=>msg.recipient_id===userLogin.id && !msg.notification_ack && (msg.notification_type ==='Request denied' || msg.notification_type ==='Request accepted') )
        let numToasts = myNotifications.length
          let boolsArr = []
          for(let i=0;i<numToasts;i++){
              boolsArr.push(true)
          }
          setToastBools(boolsArr)
          setNotifs(myNotifications)
      })
  } else {
    fetch("http://localhost:8080/join/lsp_user_messages")
      .then(res =>res.json())
      .then(data => {
        let myNotifications = data.filter(msg=>msg.recipient_id===userLogin.id && !msg.notification_ack && msg.notification_type ==='New request' )
        let numToasts = myNotifications.length
          let boolsArr = []
          for(let i=0;i<numToasts;i++){
              boolsArr.push(true)
          }
          setToastBools(boolsArr)
          setNotifs(myNotifications)
      })
  }

}, [userLogin.id])


//Request denied by (SpaceX) for (Payload Name)

return (
    <ToastContainer position={'middle-center'}>
        {notifs?.map((update, i) => {
            const timestamp = update.timestamp
            const formatted = moment(timestamp).fromNow()

            if(toastBools[i]===true){
                return ( 
                    <Toast key={i} show={toastBools[i]}  onClose={()=>toggleShowA(i,update.msg_id)}  className={'bg-dark text-white'}>
                    <Toast.Header className={'bg-dark text-white'}>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto"> Launch Request Alert</strong>
                        <small className="text-muted">{formatted}</small>
                    </Toast.Header>
                    <Toast.Body>
                        {userLogin.role==='payload_user' && <span key={i}>{update.notification_type} by {update.organization} for {update.name}</span>}
                        {userLogin.role==='lsp_user' && <span key={i}>{update.notification_type} from {update.organization} for {update.name}</span>}
                        <br></br>
                        <Link state={update} to={'/requestdetails'} onClick={() => {toggleShowA(i, update.msg_id)}}>View Details</Link>
                    </Toast.Body>
                    </Toast>
              )
            }
            })}
  </ToastContainer>
  )

}

export default Notifications