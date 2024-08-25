import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Create the context
export const AuthContext = createContext();

// Define the provider component
export const AuthProvider = ({children}) => {

   const [token,setToken]=useState(localStorage.getItem("token"))
   const [user,setUser]=useState(null);
   const API=import.meta.env.VITE_BASE_URL;
   console.log("API",API)
   const storetokenInLS=(serverToken)=>{
    setToken(serverToken)
    localStorage.setItem("token",serverToken);
    // jwtVerification();
    
   }

   const logoutUser=()=>{
     setToken("");
     localStorage.removeItem("token");
     setUser(null);
   }
// chk whether token is present or not
   const isToken=!!token;
   
   //jwt Verification whenever a User login for contact auto set details 
   const jwtVerification=async()=>{
    if(token)
        {
            try{
                const response=await fetch(`${API}/userData`,
                {
                   method:"GET",
                   headers:
                   {
                      Authorization:`Bearer ${token}`
                   },
                });
               if(response.ok)
                   {
                       const data=await response.json();
                    //    console.log(data);
                       setUser(data);
                   }
          }
          catch(e)
          {
           console.log(e.message);
          }
        }
       
   }
     
   useEffect(()=>{
    jwtVerification();
    },[token])

    return (
        <AuthContext.Provider value={{storetokenInLS,logoutUser,isToken,user,token,API}}>
            {children}
        </AuthContext.Provider>
    );
};
// only to remove red line from children argument
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth=()=>{
    const authContextValue=useContext(AuthContext);
    if(!authContextValue)
        {
            throw new Error("Use AuthContext Correctly");
        }
    return authContextValue;
}


