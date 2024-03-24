import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api';

import './styles.css';
import './assets/themes/material/material-light/compact/deeppurple/theme.scss'

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>,
)
