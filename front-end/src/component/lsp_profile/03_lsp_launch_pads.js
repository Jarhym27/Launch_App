import React, { useState, useContext, useEffect} from "react"
import { LspDistro } from "./01_lsp_profile_page"
import './lsp_profile.css'
export default LspLaunchPads

function LspLaunchPads () {
  const {launchVehicle, setLaunchVehicle, launchPad, setLaunchPad} = useContext(LspDistro)

  useEffect(() =>{
    fetch(`https://localhost:8080/table/launch_pads`)
    .then(res => res.json())
    .then(data => setLaunchPad(data))
  },[])





  return (
  <div>
    Launch Pads
    <div>Pad 34</div>
    <div>Pad 35</div>
    <div>Pad 24</div>
    <div>add New Pad</div>
  </div>
  )
}
