import React, { useState, useEffect } from "react";
import axios from 'axios'; // Add this line
import Index from "./Components/Pages/IndexPage/Index";
import Login from "./Components/Pages/LoginPage/Login";
import Register from "./Components/Pages/RegisterPage/Register";
import Alert from "./Components/AlertSnackBar";
import { BrowserRouter, Switch } from "react-router-dom";
import Boards from "./Components/Pages/BoardsPage/Boards";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { loadUser } from "./Services/userService";
import Store from "./Redux/Store";
import FreeRoute from "./Utils/FreeRoute";
import Board from "./Components/Pages/BoardPage/Board";

const baseUrl = 'http://localhost:3001';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      let token = localStorage.getItem('token');
      if (token) {
        try {
          await loadUser(Store.dispatch);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            // The token is expired or invalid
            console.log('The token is expired or invalid');
            // Try to refresh the token
            try {
              const refreshRes = await axios.post(baseUrl + "/refresh-token", {
                refreshToken: localStorage.getItem('refreshToken') // Replace this with how you retrieve the refresh token
              });
              // If the refresh token request is successful, store the new token and retry the request
              token = refreshRes.data.token;
              localStorage.setItem('token', token); // Replace this with how you store the token
              await loadUser(Store.dispatch);
            } catch (refreshError) {
              // If the refresh token request fails, remove the token from local storage
              localStorage.removeItem('token');
            }
          }
        }
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  if (loading) {
    return <div style={{ backgroundColor: 'white', height: '100vh', width: '100vw' }} />;
  }

  return (
    <BrowserRouter>
      <Alert />
      <Switch>
        <ProtectedRoute exact path="/boards" component={Boards} />
        <ProtectedRoute exact path="/board/:id" component={Board} />
        <FreeRoute exact path="/login" component={Login} />
        <FreeRoute exact path="/register" component={Register} />
        <FreeRoute exact path="/" component={Index} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;