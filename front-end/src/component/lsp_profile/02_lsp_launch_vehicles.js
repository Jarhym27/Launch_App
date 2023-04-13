import React, {  useContext,useEffect } from "react"
// import { LspDistro } from "./01_lsp_profile_page";
export default LspLaunchVehicles ;



function LspLaunchVehicles() {

    // const {launchVehicle, setLaunchVehicle} = useContext(LspDistro)

  // useEffect(() => {
  //   fetch(`https://localhost:8080/table/launch_vehicles`)
  //     .then(res => res.json())
  //     .then(data => setLaunchVehicle(data))
      
  // }, [])

  

  return (
    <>
      <div className='categoryTitle'>
        Launch Vehicles
        <div>Falcon 9  Pad 15</div>
          
          <div>Falcon 9  Pad 22</div>
          Delta V   Pad C20
        
      </div>

      <div className="makenew">
       <button> New Launch Vehicle</button>
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

