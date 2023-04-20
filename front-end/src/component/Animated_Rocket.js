import React from "react"
import {RocketTakeoffFill} from "react-bootstrap-icons";
import "../css/Animated_Rocket.css"
import {GiEvilMoon} from "react-icons/gi"

const AnimeRocket = () =>{

return(
  <>
    <div className="container">
      <GiEvilMoon className="moon" color='dark-gray' size={100}/> 
       </div>
      <div className="orbit">
        <RocketTakeoffFill className="image_launch" color='red' size={100}>
          <div className="window"></div>
          </RocketTakeoffFill>
       </div>         
  </>
    
  )
}
export default AnimeRocket;