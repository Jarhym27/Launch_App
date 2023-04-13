import React, {  useContext,useEffect } from "react"
import { LspDistro } from "./01_lsp_profile_page";

export default LspLaunchVehicles && addNewLV;



function LspLaunchVehicles() {

    const {launchVehicle,setLaunchVehicle} = useContext(LspDistro)
  useEffect(() => {
    fetch(`https://localhost:8080/table/launch_vehicles`)
      .then(res => res.json())
      .then(data => setLaunchVehicle(data))
  }, [])


  return (
    <>
      <div className='categoryTitle'>
        Launch Vehicles
        <div className='categoryTile'>{launchVehicle.launch_vehicle}</div>
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

