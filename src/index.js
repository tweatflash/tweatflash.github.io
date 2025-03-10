import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main_App from './app';
import './styles/main_style/main.css'
import { AuthProvider } from './context/authProvider';
import { store } from './app/store';
import {Provider} from "react-redux"
const root = ReactDOM.createRoot(document.querySelector('.container'));
root.render(
  <React.StrictMode>

    <Router>
      <GoogleOAuthProvider clientId='320205154286-lh8gfn85lg9q7vtvkof12qrfrcqt72gr.apps.googleusercontent.com'>
        <Provider store={store()}>
          <AuthProvider>
              <Routes>
                <Route path='/*' element={<Main_App/>}/>
              </Routes> 
          </AuthProvider>
        </Provider>
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>
);