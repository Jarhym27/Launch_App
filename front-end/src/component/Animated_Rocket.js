import React from "react"
import {RocketFill} from "react-bootstrap-icons";
import "../css/Animated_Rocket.css"
import {GiEvilMoon} from "react-icons/gi"

const AnimeRocket = () =>{

return(
  <>
    <div className="container">
      <GiEvilMoon className="moon" color='dark-gray' size={100}/> 
       </div>
      <div className="orbit">
        <RocketFill className="image_launch" size={100}>
          <div className="window"></div>
          </RocketFill>
       </div>         
  </>
    
  )
}
export default AnimeRocket;