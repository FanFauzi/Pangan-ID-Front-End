import { useNavigate } from 'react-router-dom';

export default function OrderItemCard({ order }) {
  const navigate = useNavigate();

  return (
    <div className="border rounded-md p-4 bg-white shadow-md flex flex-col gap-2">
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-semibold">Pesanan #{order.id}</p>
          <p className="text-sm text-gray-600">Status: {order.status}</p>
          <p className="text-sm text-gray-600">Total: Rp {parseInt(order.total_price).toLocaleString('id-ID')}</p>
        </div>
        <div className="flex gap-2 items-start">
          <button
            onClick={() => navigate(`/produsen/order/${order.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md"
          >
            Detail
          </button>
          <button
            onClick={() => navigate(`/produsen/order/${order.id}/update-status`)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-md"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}
