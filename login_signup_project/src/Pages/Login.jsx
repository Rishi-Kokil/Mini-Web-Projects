import React from "react";

const Login = () => {
    return (
        <div>
            <form
                className="h-[400px] w-[400px] mx-auto mt-4 flex flex-col justify-center"
            >
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
            </form>
        </div>
    );
}

export default Login;