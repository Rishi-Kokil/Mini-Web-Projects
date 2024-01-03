import React, { useCallback, useEffect } from 'react'
import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from '../Components/AuthContext';


function Home() {

    const navigate = useNavigate();
    const {isAuthenticated , logout} = useAuth();

    useEffect(() => {
        const navigate = useNavigate();
        if(!isAuthenticated){
            navigate("/login");
        }   
    }, [navigate]);
    
    return (
        <div>
            Home
        </div>
    )
}

export default Home;