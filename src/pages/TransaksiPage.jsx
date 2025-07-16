import { useEffect, useState } from 'react';

export default function TransaksiPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/order/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setOrders(data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const pemasukan = orders.filter(order => order.status === 'done');
  const totalPemasukan = pemasukan.reduce((sum, order) => sum + parseInt(order.total_price), 0);

  const pengeluaran = orders.filter(order => order.status === 'cancelled');
  const totalPengeluaran = pengeluaran.reduce((sum, order) => sum + parseInt(order.total_price), 0);

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
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Laporan Keuangan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Pemasukan */}
        <div>
          <h2 className="text-xl font-semibold text-green-700 mb-4">Pemasukan (Transaksi Berhasil)</h2>
          <p className="font-bold mb-2">Total: Rp {totalPemasukan.toLocaleString('id-ID')}</p>
          <table className="w-full bg-white border rounded shadow text-sm">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="p-2 border-b">Tanggal</th>
                <th className="p-2 border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {pemasukan.map((order) => (
                <tr key={order.id} className="hover:bg-green-50">
                  <td className="p-2 border-b">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="p-2 border-b">Rp {parseInt(order.total_price).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pengeluaran */}
        <div>
          <h2 className="text-xl font-semibold text-red-700 mb-4">Pengeluaran (Dibatalkan)</h2>
          <p className="font-bold mb-2">Total: Rp {totalPengeluaran.toLocaleString('id-ID')}</p>
          <table className="w-full bg-white border rounded shadow text-sm">
            <thead className="bg-red-100 text-red-800">
              <tr>
                <th className="p-2 border-b">Tanggal</th>
                <th className="p-2 border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {pengeluaran.map((order) => (
                <tr key={order.id} className="hover:bg-red-50">
                  <td className="p-2 border-b">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="p-2 border-b">Rp {parseInt(order.total_price).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
