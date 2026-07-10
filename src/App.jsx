import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainSite from './MainSite'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
