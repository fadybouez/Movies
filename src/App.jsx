import "./App.css";
import Navbar from "./Navbar/Navbar";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home/Home";
import About from "./About/About";
import Login from "./Login/Login";
import Network from "./Network/Network";
import Register from "./Register/Register";
import Movies from "./Movies/Movies";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import MovieDetails from './MovieDetails/Moviedetails';
import { MediaContextProvider } from "./MediaContext";


function App() {

  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();
useEffect(()=>{
  if(localStorage.getItem('userToken')){
    getUserData()
  }else{
    setUserData(null)
  }
},[])
// get user data from local storage
  function getUserData(){
    let userDataDecoded= jwtDecode(localStorage.getItem('userToken'))
    setUserData(userDataDecoded)
  }

  function logout(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
  }

  function ProtectedRoute({children}){
  if(!localStorage.getItem('userToken')){
    return  <Navigate to='/login' />
  }else{
    return children
  }
}

  return (
    <div>
      <Navbar userData={userData} logout={logout}/>
      <div className="container">
        <MediaContextProvider>
        <Routes>
          <Route path="/" element={ <ProtectedRoute><Home/></ProtectedRoute>  } />
          <Route path="home" element={ <ProtectedRoute><Home/></ProtectedRoute>  } />
          <Route path="about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="movies" element={ <ProtectedRoute><Movies/></ProtectedRoute>} />
          <Route path="login" element={<Login userData={getUserData}/>} />
          <Route path="network" element={ <ProtectedRoute><Network/></ProtectedRoute>} />

          <Route path="movieDetails" element={ <ProtectedRoute> <MovieDetails/></ProtectedRoute>}>
            <Route path=":id/:mediaType" element={ <MovieDetails/>}/>
            
          </Route>

          <Route path="register" element={<Register />} />
          <Route path="*" element={<h1>NOT FOUND 404</h1>} />
        </Routes>
        </MediaContextProvider>
      </div>
    </div>
  );
}

export default App;
