import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function HargaPanganPage() {
  const [region, setRegion] = useState('Nasional');
  const [market, setMarket] = useState('tradisional');
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/prices?region=${region}&market=${market}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal memuat harga');
      setPrices(data.prices); // format: [{ commodity, price, change }]
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPrices(); }, [region, market]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Harga Pangan & Sembako</h1>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <select value={region} onChange={e => setRegion(e.target.value)} className="border p-2 rounded">
          <option>Nasional</option>
          <option>Jawa Barat</option>
          <option>DKI Jakarta</option>
          {/* dll sesuai data */}
        </select>
        <select value={market} onChange={e => setMarket(e.target.value)} className="border p-2 rounded">
          <option value="tradisional">Pasar Tradisional</option>
          <option value="modern">Pasar Modern</option>
          <option value="pedagang">Pedagang Besar</option>
          <option value="produsen">Produsen</option>
        </select>
        <button onClick={fetchPrices} className="bg-green-600 text-white px-4 py-2 rounded">Refresh</button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-8 w-8 text-green-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Komoditas</th>
                <th className="p-2">Harga (Rp/kg)</th>
                <th className="p-2">Perubahan (%)</th>
              </tr>
            </thead>
            <tbody>
              {prices.map(p => (
                <tr key={p.commodity} className="hover:bg-gray-50">
                  <td className="p-2">{p.commodity}</td>
                  <td className="p-2">{parseInt(p.price).toLocaleString('id-ID')}</td>
                  <td className={`p-2 ${p.change.includes('-') ? 'text-red-600' : 'text-green-600'}`}>
                    {p.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
