import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainSite from './MainSite'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import FAQAdmin from './pages/FAQAdmin'
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
