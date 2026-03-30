import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Fix: Routes/useRoutes in App need Router context from BrowserRouter. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
