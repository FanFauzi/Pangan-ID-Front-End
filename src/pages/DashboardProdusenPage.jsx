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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('http://localhost:5000/api/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setProducts(data); // data harus array
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-neutral-100">
      <main className="flex-1">
        <Jumbotron />
        <div className="card-fitur w-screen flex px-15 gap-10">
          <CardFitur imgFitur={kelolaProduk} titleFitur="Kelola Produk" />
          <CardFitur imgFitur={transaksi} titleFitur="Transaksi" />
          <CardFitur imgFitur={harga} titleFitur="Harga" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800 px-15 pt-8">Produk Terbaru</p>
          <div className="card-produk grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-15 py-4">
            {products.map((product) => (
              <CardProduct
                key={product.id}
                imgProduct={`http://localhost:5000${product.image_url}`}
                titleProduct={product.name}
                descProduct={product.description}
                priceProduct={`Rp ${parseInt(product.price).toLocaleString("id-ID")}`}
                onClick={() => navigate(`/checkout/${product.id}`)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
