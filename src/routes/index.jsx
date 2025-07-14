import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import RolePage from '../pages/RolePage';
import DashboardProdusenPage from '../pages/DashboardProdusenPage';
import KelolaProdukPage from '../pages/KelolaProdukPage';
import AddProductPage from '../pages/AddProductPage';
import EditProductPage from '../pages/EditProductPage';
import LayoutPage from '../layouts/LayoutPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CheckoutPage from '../pages/CheckOutPage';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/role" element={<RolePage />} />

        <Route path="/produk-detail/:id" element={<ProductDetailPage />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />

        {/* Semua route produsen di dalam layout */}
        <Route path="/produsen" element={<LayoutPage />}>
          <Route path="dashboard" element={<DashboardProdusenPage />} />
          {/* <Route path="/produk/:id" element={<ProductDetailPage />} /> */}

          <Route path="kelola-produk" element={<KelolaProdukPage />} />
          <Route path="tambah-produk" element={<AddProductPage />} />
          <Route path="edit-produk/:id" element={<EditProductPage />} />
          <Route path="pesanan" element={<div>Pesanan Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}
