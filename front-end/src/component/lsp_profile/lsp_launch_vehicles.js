import React, { useEffect } from "react"

function lspLVs {
    useEffect{

    }
    function addNewLV() {
        //reveal the add new fields and hide the active LVs
        //once fields are in, update the page with new LV
    }
    return (
        <>
            <div className='categoryTitle'>
                <button onClick={addNewLV}></button>
                Launch Vehicles
                <div className='categoryTile'>LV0035-Pad 34</div>
                <div className='categoryTile'>Falcon-12-Pad 35</div>
                <div className='categoryTile'>Dragon-No Pad</div>
            </div>
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

