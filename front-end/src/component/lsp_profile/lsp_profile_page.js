import React ,{useState,useContext } from 'react';
import { Route,Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { lspLVs, lspPads, requestList, lspCalendar} from './lsp_profile/*'

export const LSP_distro = React.createContext();

function lspProfilePage ()  {
    const [lspuser, setLspuser] = useState(false)
    // const navigate = useNavigate();
    return(
        <Distibution.Provider value = {{lspuser, setLspuser}}>
            <Header>
                <Routes>
                    

                </Routes>
            </Header>
        </Distibution.Provider>
    )
}
