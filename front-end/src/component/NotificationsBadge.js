import React from 'react'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { useState, useContext, useEffect } from 'react';
import { RocketInfo } from '../App';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function NotificationsBadge() {
const [notifs, setNotifs] = useState();
const [totalMess, setTotalMess] = useState();
const [myMessages,setMyMessages] = useState();
const {userLogin} = useContext(RocketInfo);
const [bools, setBools] = useState();

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
          let newBools = JSON.parse(JSON.stringify(bools))
          newBools[index] = !newBools[index]
          setBools(newBools)
        }
      })
      
  };

    useEffect(() => {
        if(userLogin.role === 'payload_user'){
          fetch("http://localhost:8080/join/payload_user_messages") 
            .then(res =>res.json())
            .then(data => {
               let tempNotifs= data.filter(msg=>msg.recipient_id===userLogin.id && !msg.notification_ack )          
                setTotalMess(tempNotifs.length);
                setNotifs(tempNotifs)
            })        
        } else {
            fetch("http://localhost:8080/join/lsp_user_messages") 
            .then(res =>res.json())
            .then(data => {
               let tempNotifs= data.filter(msg=>msg.recipient_id===userLogin.id && !msg.notification_ack )          
                setTotalMess(tempNotifs.length);
                setNotifs(tempNotifs)
            }) 
        }
      }, [userLogin.id])

         console.log('alerts ', notifs);
         console.log('total Mess ', totalMess);
    if(totalMess) {
  return (
    <div >
        
         <OverlayTrigger trigger="click" placement="bottom" overlay={ 
         <Popover id="popover-position-bottom">
                <Popover.Header as="h3" className='test'>Notifications</Popover.Header>
                <Popover.Body className={'bg-dark text-white'}>
                {notifs?.map((mess, i) => {
                    return (
                        <>
                            <Link onClick={() => {toggleShowA(i, mess.msg_id)}} state={mess} to={'/requestdetails'}  key={i}><span>{mess.notification_type}: {mess.name} </span><br></br></Link>
                            
                        </>
                    )
                    })}
               
                </Popover.Body>
            </Popover>
            }>
           
            <Badge badgeContent={totalMess} color="primary">
                <MailIcon color="action" />
            </Badge>
        </OverlayTrigger>
    </div>
  )
    }
}

export default NotificationsBadge