import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom';
import {MainContextProvider} from './store/MainContextProvider';
import { ArticleContextProvider } from './store/ArticleContextProvider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ArticleContextProvider>  
    <MainContextProvider>  
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </MainContextProvider>
    </ArticleContextProvider>
  </React.StrictMode>
);

reportWebVitals();
