
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import AlertProvider from './common/AlertProvider.tsx'
import { UserProvider } from './common/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>
)
