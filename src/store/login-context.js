import React, { useState } from 'react'

const LoginContext = React.createContext({
    token:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

export const LoginProvider = (props)=>{
    const [token,setToken] = useState(null);

    const isLoggedIn = !!token;

    const loginHandler = (token)=>{
        setToken(token);
    }
    const logoutHandler = ()=>{
        setToken(null);

    }

    const contextValue = {
        token:token,
        isLoggedIn:isLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }
    return <LoginContext.Provider value={contextValue}>{props.children}</LoginContext.Provider>
}

export default LoginContext
