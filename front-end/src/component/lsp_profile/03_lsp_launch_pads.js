import React, { useState, useContext, useEffect} from "react"
import { LspDistro } from "./01_lsp_profile_page"

export default LspLaunchPads

function LspLaunchPads () {
  const {LspUser, launchVehicle, setLaunchVehicle, launchPad, setLaunchPad} = useContext(LspDistro)

  useEffect(() =>{
    fetch(`https://localhost:8080/table/launch_pads`)
    .then(res => res.json())
    .then(data => setLaunchPad(data))
  },[])
  
  const activePads = () => 
  {
    launchPad.map( element => element.launch_pad
      
      
      if(element.lsp_user_id === LspUser.id)
    )
    
  }
  

  return (
  <div>
    Launch Pads
    <div>{activePads}</div>
    <div>Pad 22</div>
    <div>Pad C20</div>
    <button>Add New Pad</button>
  </div>
  )
}
