import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:5000/api/produk/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const handleCheckout = () => {
    // arahkan ke halaman checkout atau tampilkan popup
    navigate(`/checkout/${id}`);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <img src={`http://localhost:5000${product.image_url}`} alt={product.name} className="w-1/2 rounded" />
      <h1 className="text-3xl font-bold my-4">{product.name}</h1>
      <p className="text-lg text-gray-700 mb-2">{product.description}</p>
      <p className="text-xl font-semibold mb-4">Rp {parseInt(product.price).toLocaleString("id-ID")}</p>
      <button onClick={handleCheckout} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Checkout Sekarang
      </button>
    </div>
  );
}
