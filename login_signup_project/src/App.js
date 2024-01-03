
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './Components/AuthContext';
import { Home, Login, SignUp } from './Pages';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';

const router = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <SignUp /> }
  ]
);

function App() {

  const { isAuthenticated, login, logout } = useAuth();

  useEffect(async () => {
    const navigate = useNavigate();

    const URL_PATH = "https://localhost:5000/user/"
    const response = await fetch(URL_PATH , {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        authorization : "Bearer " + localStorage.getItem("authToken")
      }
    });

    if(!response.ok){
      navigate("/login");
    }
    else{
      login(localStorage.getItem("authToken"));
    }
    
  }, [navigate, isAuthenticated, login, logout]);


  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  );
}

export default App;


