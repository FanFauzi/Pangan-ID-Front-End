import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Jumbotron from "../components/Jumbotron";
import CardFitur from "../components/CardFitur";
import CardProduct from "../components/CardProduct";
import kelolaProduk from '../assets/img/kelolaProduk.png';
import transaksi from '../assets/img/transaksi.png';
import harga from '../assets/img/harga.png';


export default function DashboardProdusenPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/produk', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        setProducts(data); // data harus array
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-green-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <p className="text-gray-600 text-sm">Memuat data transaksi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-neutral-100">
      <main className="flex-1">
        <Jumbotron />
        <div className="card-fitur w-screen flex px-15 gap-10">
          <CardFitur
            imgFitur={kelolaProduk}
            titleFitur="Kelola Produk"
            onClick={() => navigate('/produsen/kelola-produk')} />

          <CardFitur
            imgFitur={transaksi}
            titleFitur="Transaksi"
            onClick={() => navigate('/produsen/transaksi')} />

          <CardFitur
            imgFitur={harga}
            titleFitur="Harga"
            onClick={() => navigate('/produsen/harga-pangan')} />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800 px-15 pt-8">Produk Terbaru</p>
          <div className="card-produk grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-15 py-4">
            {products.length === 0 ? (
              <p className="text-gray-500 italic">Belum ada produk tersedia.</p>
            ) : (products.map((product) => (
              <CardProduct
                key={product.id}
                imgProduct={`http://localhost:5000${product.image_url}`}
                titleProduct={product.name}
                descProduct={product.description}
                priceProduct={`Rp ${parseInt(product.price).toLocaleString("id-ID")}`}
                onClick={() => navigate(`/checkout/${product.id}`)}
              />
            ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
