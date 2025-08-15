import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import HomePage from './pages/HomePage'
import FMCSACompliance from './pages/FMCSACompliance'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
  <Route path="/fmcsa-compliance" element={<FMCSACompliance />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
