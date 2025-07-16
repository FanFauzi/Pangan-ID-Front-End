import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from '../components/header';

export default function LayoutPage() {
  const location = useLocation();
  const noSidebarRoutes = ['/produsen/dashboard', '/produsen/transaksi', '/produsen/harga-pangan' ];
  const hideSidebar = noSidebarRoutes.includes(location.pathname);


  return (
    <div className="h-screen w-screen flex flex-col bg-neutral-100">
      {/* Header tetap di atas */}
      <div className="flex-shrink-0">
        <Header />
      </div>

      {/* Kontainer isi halaman, tinggi penuh sisa layar */}
      <div className="flex flex-1">
        {/* Sidebar (jika ditampilkan) */}
        {!hideSidebar && (
          <div className="w-1/4 h-full bg-white px-10 pt-5 font-medium text-lg sm:font-normal sm:text-sm overflow-y-auto">
            <h3><Link to="/produsen/pesanan" className="hover:underline">Pesanan</Link></h3>
            <h3 className="py-2"><Link to="/produsen/kelola-produk" className="hover:underline">Produk</Link></h3>
            <h3><Link to="/produsen/tambah-produk" className="hover:underline">Tambah Produk</Link></h3>
          </div>
        )}

        {/* Konten utama yang scrollable */}
        <div className={`${hideSidebar ? 'w-full' : 'w-3/4'} overflow-y-auto h-full py-5`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
