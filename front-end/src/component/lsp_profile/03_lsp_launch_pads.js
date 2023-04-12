import React, { useState, useEffect} from "react"
import { LSP_distro } from "./01_lsp_profile_page"
import './lsp_profile.css'

function lspPads () {
  const [launchPad, setLaunchPad] = useState()
  const [launchVehicle, setLaunchVehicle ] = React.useContext(LSP_distro)

  useEffect(() =>{
    fetch(`https://localhost:8080/table/launch_pads/:id`)
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
