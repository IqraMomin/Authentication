import React, { useState } from 'react'



const LoginContext = React.createContext({
    token:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

export const LoginProvider = (props)=>{

    const idToken = JSON.parse(localStorage.getItem("idToken")) || "";

    const [token,setToken] = useState(idToken);

    const isLoggedIn = !!token;

    const loginHandler = (token)=>{
        setTimeout(()=>{
            localStorage.removeItem("idToken");
            setToken(null);
        },5000)
        localStorage.setItem("idToken",JSON.stringify(token));
        setToken(token);
    }
    const logoutHandler = ()=>{
        localStorage.removeItem("idToken");
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
