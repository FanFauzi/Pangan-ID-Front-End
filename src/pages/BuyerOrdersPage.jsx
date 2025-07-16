// BuyerOrdersPage.jsx
import { useEffect, useState } from 'react';

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('http://localhost:5000/api/orders/buyer', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Pesanan Saya</h2>
      {orders.map(order => (
        <div key={order.id} className="border p-4 mb-4 rounded shadow bg-white">
          <p><strong>ID Pesanan:</strong> #{order.id}</p>
          <p><strong>Tanggal:</strong> {new Date(order.created_at).toLocaleString()}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> Rp {parseInt(order.total_price).toLocaleString("id-ID")}</p>
          <div className="mt-2">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.product.name} x{item.quantity}</span>
                <span>Rp {parseInt(item.price).toLocaleString("id-ID")}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
