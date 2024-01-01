import './App.css';
import { Home, Login, SignUp } from './Pages';

import { createRoutesFromElements } from "react-router-dom";
import { createBrowserRouter, RouterProvider, Route, Link, } from "react-router-dom";
import { redirect } from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Home />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
        </Route>
    )
);

function App() {
  return ( 
    <RouterProvider router={router} />
  );
}

export default App;
