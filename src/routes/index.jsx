import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import RolePage from '../pages/RolePage'
import DashboardProdusenPage from '../pages/DashboardProdusenPage' 
import KelolaProdukPage from '../pages/KelolaProdukPage'

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/role" element={<RolePage />} />
        <Route path="/produsen/dashboard" element={<DashboardProdusenPage />} />
        <Route path="/produsen/kelola-produk" element={<KelolaProdukPage />} />
        <Route path="/konsumen/dashboard" element={<DashboardProdusenPage />} />
      </Routes>
    </Router>
  )
}
