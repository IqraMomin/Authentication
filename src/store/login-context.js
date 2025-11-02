import React, { useState ,useEffect} from 'react'



const LoginContext = React.createContext({
    token:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})
let logoutTimer;
const calculateRemainingTime = (time)=>{
    const currentTime = new Date().getTime();
    const expirationTime = new Date(time).getTime();
    const remainingDuration = expirationTime - currentTime;
    return remainingDuration;
}



export const LoginProvider = (props)=>{

    const idToken = localStorage.getItem("idToken") || "";

    const [token,setToken] = useState(idToken);

    
    const isLoggedIn = !!token;

    const loginHandler = (token)=>{
        setToken(token);
        const expirationTime = new Date(new Date().getTime()+5*60*1000);
        localStorage.setItem("idToken",token);
        localStorage.setItem("expiration",expirationTime.toISOString());

        const remaining = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler,remaining);
        
    }
    const logoutHandler = ()=>{
        setToken(null);
        localStorage.removeItem("idToken");
        localStorage.removeItem("expiration");
        if(logoutTimer){
            clearTimeout(logoutTimer);
        }
        

    }
    useEffect(()=>{
        const storedToken = localStorage.getItem("idToken");
        const storedExpirationTime = localStorage.getItem("expiration");
    
        if(storedToken && storedExpirationTime){
            const remainingTime = calculateRemainingTime(storedExpirationTime);
            if(remainingTime<=0){
                logoutHandler();
            }else{
                setToken(storedToken);
                logoutTimer = setTimeout(logoutHandler,remainingTime);
            }
        } 
    
        
    
    },[])

    const contextValue = {
        token:token,
        isLoggedIn:isLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }
    return <LoginContext.Provider value={contextValue}>{props.children}</LoginContext.Provider>
}

export default LoginContext
