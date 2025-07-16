import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/produk/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCheckout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productId: product.id,
          quantity
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      toast.success('Checkout berhasil!');
      navigate('/produsen/dashboard');
    } catch (err) {
      console.error(err);
      toast.warn('Checkout gagal!');
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="w-screen min-h-screen px-4 md:px-10 pt-5 bg-neutral-100">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate('/produsen/dashboard')}
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
      >
        ← Kembali ke Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-4">Checkout Produk</h1>

      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-5xl mx-auto">
        <img
          src={`http://localhost:5000${product.image_url}`}
          alt={product.name}
          className="w-full lg:w-1/2 h-64 object-cover"
        />
        <div className="p-6 flex flex-col justify-between w-full lg:w-1/2">
          <div>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <p className="text-green-700 font-semibold mt-4">
              Harga: Rp {parseInt(product.price).toLocaleString("id-ID")}
            </p>
            <p className="text-gray-600 mt-1">Stok tersedia: {product.stock}</p>
          </div>
          <div className="mt-4">
            <label htmlFor="qty" className="block text-sm">Jumlah:</label>
            <input
              id="qty"
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-2 py-1 w-20"
            />
          </div>
          <button
            className="bg-green-600 text-white px-4 py-2 mt-4 rounded hover:bg-green-700"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
