import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import HomePage from './pages/HomePage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
  {/* FMCSA Compliance route removed */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
