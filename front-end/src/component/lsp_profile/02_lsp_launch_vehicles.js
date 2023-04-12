import React, { useState, useEffect } from "react"
import { LSP_distro } from "./01_lsp_profile_page";

export default lspLVs && addNewLV;



function lspLVs() {

    const {launchVehicle,setLaunchVehicle} = React.useContext(LSP_distro)
  useEffect(() => {
    fetch(`https://localhost:8080/table/launch_vehicles/:id`)
      .then(res => res.json())
      .then(data => setLaunchVehicle(data))
  }, [])


  return (
    <>
      <div className='categoryTitle'>
        Launch Vehicles
        <div className='categoryTile'>{launchVehicle}</div>
        <div className='categoryTile'>Falcon-12-Pad 35</div>
        <div className='categoryTile'>Dragon-No Pad</div>
      </div>
    </>
  )
}

function addNewLV() {
  //reveal the add new fields and hide the active LVs
  //once fields are in, update the page with new LV
  return (
    <>
      <button onClick={addNewLV}></button>
      <div className='makenew' id='newLV'>
        New Launch Vehicle
        <input type='field' placeholder="Name" />
        <input type='field' placeholder="Cost" />
        <input type='field' placeholder="MEO weight in tons" />
        <input type='field' placeholder="LEO weight in tons" />
        <input type='field' placeholder="GEO weight in tons" />
        <input type='field' placeholder="HEO weight in tons" />
      </div>
    </>

  )

}

