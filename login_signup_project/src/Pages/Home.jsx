import React, { useCallback, useEffect } from 'react'
import { redirect, useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("auth_token");
        console.log(auth);
        console.log("inside auth loader");
        if (auth) {
            fetch("https://localhost:5000/login", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'authorization': `Bearer ${auth}`,
                }
            }).then((response) => {
                if (!response.ok) {
                    navigate("/login");
                }
                else {
                    //parsing the string to json
                    const result = response.json();
                }

            })
        }
        else {
            navigate("/login");
        }
    }, [])


    return (
        <div>
            Home
        </div>
    )
}

export default Home;