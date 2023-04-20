import React from "react"
import {RocketFill} from "react-bootstrap-icons";
import "../css/Animated_Rocket.css"
import {GiEvilMoon} from "react-icons/gi"


const AnimeRocket = () =>{
  
return(
  <>
    <div className="containerRocket">
      <GiEvilMoon className="moon" color='dark-gray' size={100}/> 
       </div>
      <div className="orbit">
        <RocketFill className="image_launch" color='red' size={100} >
          <div className="windowRocket"></div>
          </RocketFill >
          

       </div>         
  </>
    
  )
}
export default AnimeRocket;
