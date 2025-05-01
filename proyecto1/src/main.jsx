import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { VoteProvider } from './context/VoteContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <VoteProvider>
        <App />
      </VoteProvider>
    </BrowserRouter>
  </React.StrictMode>
);
