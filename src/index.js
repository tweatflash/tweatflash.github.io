import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';
import Main_App from './app';
import './styles/main_style/main.css'
import { AuthProvider } from './context/authProvider';
const root = ReactDOM.createRoot(document.querySelector('.container'));
root.render(
  <React.StrictMode>

    {/* <HashRouter> */}
      <GoogleOAuthProvider clientId='320205154286-lh8gfn85lg9q7vtvkof12qrfrcqt72gr.apps.googleusercontent.com'>
        <AuthProvider>
            <HashRouter>
              <Main_App/>
            </HashRouter> 
        </AuthProvider>
      </GoogleOAuthProvider>
    {/* </HashRouter> */}
  </React.StrictMode>
);