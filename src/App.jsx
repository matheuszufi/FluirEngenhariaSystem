import { HashRouter, Routes, Route } from 'react-router-dom'
import MainSite from './MainSite'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import FAQAdmin from './pages/FAQAdmin'
import TestimonialsAdmin from './pages/TestimonialsAdmin'
import PortfolioAdmin from './pages/PortfolioAdmin'
import ClientsAdmin from './pages/ClientsAdmin'
import HeroAdmin from './pages/HeroAdmin'
import EntregasAdmin from './pages/EntregasAdmin'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/faq" element={<ProtectedRoute><FAQAdmin /></ProtectedRoute>} />
        <Route path="/dashboard/testimonials" element={<ProtectedRoute><TestimonialsAdmin /></ProtectedRoute>} />
        <Route path="/dashboard/portfolio" element={<ProtectedRoute><PortfolioAdmin /></ProtectedRoute>} />
        <Route path="/dashboard/clients" element={<ProtectedRoute><ClientsAdmin /></ProtectedRoute>} />
        <Route path="/dashboard/hero" element={<ProtectedRoute><HeroAdmin /></ProtectedRoute>} />
        <Route path="/dashboard/entregas" element={<ProtectedRoute><EntregasAdmin /></ProtectedRoute>} />
      </Routes>
    </HashRouter>
  )
}

export default App
