import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext' // Import the AuthProvider


createRoot(document.getElementById('root')).render(
  <StrictMode>

  <Router>
      <AuthProvider>      {/*  <== ADD  */}
        <App />
      </AuthProvider> 
    </Router>
  </StrictMode>
)
