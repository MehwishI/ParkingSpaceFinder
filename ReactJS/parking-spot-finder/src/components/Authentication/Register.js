import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Register = () => {
    const { loginWithRedirect } = useAuth0();

    useEffect(() => {
        try {
            console.log("I got registeration...");

            loginWithRedirect();

        } catch (error) {
            console.error(error);
        }
    })

    return (
        <div>Register</div>
    )
}

export default Register