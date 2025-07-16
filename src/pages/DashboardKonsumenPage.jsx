import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardProduct from "../components/CardProduct";
import Jumbotron from "../components/Jumbotron";

export default function DashboardKonsumenPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('http://localhost:5000/api/produk');
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <main className="flex-1">
        <Jumbotron />
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Belanja Produk Segar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <p className="text-gray-500 italic">Produk belum tersedia.</p>
            ) : (
              products.map((product) => (
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
