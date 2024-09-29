import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Login = () => {
    const { loginWithRedirect } = useAuth0();

    const getHandleLogin = async () => {
        
        await loginWithRedirect();
    }

    return (
        <>
            <div>Login</div>
            <button onClick={getHandleLogin}>Login</button>
        </>
    )
}

export default Login