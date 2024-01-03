import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    //based on the express it will evaluate to true or false
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("authToken") !== null
    );
    const login = (token)=>{
        localStorage.setItem("authToken" , token);
        setIsAuthenticated(true);
    }
    const logout = ()=>{
        localStorage.removeItem("authToken");
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}