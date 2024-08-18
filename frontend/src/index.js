import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './assets/bootstrap.css'
import './assets/animate.css'
import './assets/style.css'
import './assets/medical/css/medical-icons.css'
import './assets/font-icons.css'
import { BrowserRouter } from 'react-router-dom';
import UserManager from './context/AuthContext';
import NotificationCTX from "./context/AlertContex";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <NotificationCTX>
    <React.StrictMode>
      <UserManager>


        <App />

      </UserManager>

    </React.StrictMode>
    </NotificationCTX>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
