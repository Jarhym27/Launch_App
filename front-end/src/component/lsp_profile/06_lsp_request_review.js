import React, {useContext,useEffect} from "react";
import { LspDistro } from "./01_lsp_profile_page";

const ReviewRequest = () =>{
  const {launchRequest, setLaunchRequest} = useContext(LspDistro)
  
  useEffect(() =>{
  fetch('https://localhost:8080/table/launch_requests')
  .then(res => res.json())
  .then(data => setLaunchRequest(data))
},[])

  return(
    <>
      <div>
        {launchRequest}
      </div>
    </>

  )
}

export default ReviewRequest;