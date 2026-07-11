import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainSite from './MainSite'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import FAQAdmin from './pages/FAQAdmin'
import TestimonialsAdmin from './pages/TestimonialsAdmin'
import PortfolioAdmin from './pages/PortfolioAdmin'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/faq" element={<ProtectedRoute><FAQAdmin /></ProtectedRoute>} />
        <Route path="/dashboard/testimonials" element={<ProtectedRoute><TestimonialsAdmin /></ProtectedRoute>} />
        <Route path="/dashboard/portfolio" element={<ProtectedRoute><PortfolioAdmin /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
