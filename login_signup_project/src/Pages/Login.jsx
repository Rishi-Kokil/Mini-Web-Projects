import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const URL_PATH = "https://localhost:5000/user/login";

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(username.length !== 0 && password.length !== 0){
            const response = await fetch(URL_PATH , {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                } ,
                body : JSON.stringify({ username , password })
            });

            if(response.ok){
                navigate("/");
            }

        }
    }

    return (
        <div
            className="h-[100vh]"
        >
            <form
                className="h-[50%] w-[600px] mt-16 mx-auto flex flex-col justify-center gap-3 border border-gray-300 rounded-md shadow-md items-center"
                onSubmit={handleSubmit}
            >   
                <h1
                    className="font-semibold text-[20px] m-2 text-center"
                >Login</h1>

                <input type="text" placeholder="Username" 
                    className="p-2 border border-gray-300 rounded-md ring-0 text-center"
                    onChange={(e)=>{setUsername(e.target.value)}}
                />
                <input type="password" placeholder="Password" 
                    className="p-2 border border-gray-300 rounded-md ring-0 text-center"
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <button
                    className="text-[18px] w-[120px] p-2 bg-black text-white rounded-lg"
                >Login</button>
            </form>

        </div>

    );
}

export default Login;