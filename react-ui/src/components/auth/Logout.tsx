import React, { FC } from 'react';


import { useAuth0 } from "@auth0/auth0-react";


export const Logout: FC =  () => {
    const {logout} = useAuth0();
    return(
    <button className="auth-button" onClick={() => 
    logout()}> Log out </button>
    )};

    /* Logout logic which triggers on clicking of Login/Lout button, as based on Auth0 suggestions*/

