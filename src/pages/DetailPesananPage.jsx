import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function DetailPesananPage() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`http://localhost:5000/api/order/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      const orderFound = data.orders.find((o) => o.id === parseInt(id));
      setOrder(orderFound);
    };

    fetchOrder();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      setLoadingUpdate(true);
      const res = await fetch(`http://localhost:5000/api/order/${order.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Gagal update status');

      const updated = await res.json();
      setOrder(updated.order); // pastikan backend mengembalikan order yang sudah diperbarui
      toast.success('Status berhasil diupdate!');
      setNewStatus('');
      navigate('/produsen/pesanan');
    } catch (err) {
      toast.error(err.message || 'Gagal update status');
      console.error(err);
      alert('Gagal update status');
    } finally {
      setLoadingUpdate(false);
    }
  };


  if (!order) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-green-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <p className="text-gray-600 text-sm">Memuat Detail Pesanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Detail Pesanan #{order.id}</h1>
      <p>Status: {order.status}</p>
      <p>Total Harga: Rp {parseInt(order.total_price).toLocaleString('id-ID')}</p>

      {/* Dropdown untuk Update Status */}
      <div className="mt-4">
        <label className="block text-sm font-medium">Ubah Status</label>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="border rounded px-2 py-1 mt-1"
        >
          <option value="">-- Pilih Status --</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="done">Done</option>
        </select>
        <button
          onClick={handleUpdateStatus}
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
          disabled={!newStatus || loadingUpdate}
        >
          {loadingUpdate ? 'Menyimpan...' : 'Update'}
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-6">Produk</h2>
      <ul className="list-disc ml-6">
        {order.items?.map((item) => (
          <li key={item.id}>
            {item.product.name} - {item.quantity} x Rp{' '}
            {parseInt(item.price).toLocaleString('id-ID')}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Riwayat Status</h2>
      <ul className="mt-2 space-y-2">
        {order.status_logs?.map((log) => (
          <li key={log.id} className="text-sm text-gray-700">
            {log.status} - {new Date(log.updated_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
