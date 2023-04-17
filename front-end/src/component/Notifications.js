import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { json } from 'react-router';
import { RocketInfo } from "../App";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Link } from 'react-router-dom';
import { momentLocalizer } from 'react-big-calendar';

const moment = require('moment')

function Notifications() {
const [notifs, setNotifs] = useState();
const [toastBools, setToastBools] = useState();
const {userLogin} = useContext(RocketInfo)

//Close TOASTS
const toggleShowA = (index) => {
    console.log('toggling index:',index)
    let newBools = JSON.parse(JSON.stringify(toastBools))
    newBools[index] = !newBools[index]
    console.log('new booleans set:',newBools)
    setToastBools(newBools)
};


useEffect(() => {
    console.log('use effect triggered')
    fetch("http://localhost:8080/join/launch_requests")
    .then(res => res.json())
    .then(data => {
        console.log('data', data)
        console.log('user id:',userLogin.id)
        let myRequests = data?.filter(request=>request.payload_user_id===userLogin.id)
        console.log('My requests',myRequests)
        let myToasts = myRequests.filter((e,i)=> (new Date(e.updated_at).valueOf()) >  (new Date(e.created_at).valueOf()) )
        console.log('My toasts',myToasts)
        let numToasts = myToasts.length
        let boolsArr = []
        for(let i=0;i<numToasts;i++){
            boolsArr.push(true)
        }
        setToastBools(boolsArr)
        setNotifs(myToasts)
        return myRequests})
}, [])

console.log('current time',new Date())


return (
    <ToastContainer position={'middle-center'} autoClose={2000}>
        {notifs?.map((update, i) =>{
            const timestamp = update.updated_at
            const formatted = moment(timestamp).fromNow()

            if(toastBools[i]===true){
                return (
                    
                    <Toast key={i} show={toastBools[i]}  onClose={()=>toggleShowA(i)}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto"> Launch Request Alert</strong>
                        <small className="text-muted">{formatted}</small>
                    </Toast.Header>
                    <Toast.Body>
                        <span key={i}>Payload: {update.name} status has been changed to {update.request_status}</span>
                        <br></br>
                        <Link>View Details</Link>
                    </Toast.Body>
                    </Toast>
              )
            }
            })}
  </ToastContainer>
  )
}

export default Notifications