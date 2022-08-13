import React, { FC } from 'react';


import { useAuth0 } from "@auth0/auth0-react";


export const Login: FC =  () => {
    const {loginWithPopup} = useAuth0();
    return(
    <button className="auth-button" onClick={() => 
    loginWithPopup()}> Log in </button>
    )};

