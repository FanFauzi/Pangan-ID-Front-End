import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PesananProdusenPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/order/produsen', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        // console.log(data)
        setOrders(data.orders || []);
      } catch (error) {
        toast.error('Gagal memuat pesanan');
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Pesanan Masuk</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Pembeli</th>
              <th className="py-2 px-4 text-left">Total Harga</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Tgl Pesanan</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  Tidak ada pesanan
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.buyer?.username || '-'}</td>
                  <td className="py-2 px-4">Rp {parseInt(order.total_price).toLocaleString("id-ID")}</td>
                  <td className="py-2 px-4">{order.status}</td>
                  <td className="py-2 px-4">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => navigate(`/produsen/pesanan/${order.id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
