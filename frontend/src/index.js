import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom';
import {MainContextProvider} from './store/MainContextProvider';
import { ArticleContextProvider } from './store/ArticleContextProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="396013612853-gis861c9tjg9nl3kuko5vq4c02fmbvno.apps.googleusercontent.com"> 
    <ArticleContextProvider>  
    <MainContextProvider>  
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </MainContextProvider>
    </ArticleContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();