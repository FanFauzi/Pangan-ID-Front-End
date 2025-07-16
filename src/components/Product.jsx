import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Product = ({ id, name, img, price, qty, onDelete }) => {
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const handleDelete = async () => {
    const confirm = window.confirm(`Yakin ingin menghapus produk ${name}?`);
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:5000/api/product/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        onDelete(id);
        toast.success('Produk berhasil dihapus!');
      } else {
        const err = await response.json();
        toast.error(err.message || 'Gagal menghapus produk');
      }
    } catch (err) {
      console.error(err);
      toast.error('Terjadi kesalahan saat menghapus produk');
    }
  };

  return (
    <div className='flex w-[90%] justify-between pb-5 ps-5'>
      <div className='w-[10%] flex justify-center'>
        <img src={`http://localhost:5000${img}`} alt="Product" className='rounded-[5px]' />
      </div>
      <div className='flex w-[80%] justify-around items-center'>
        <p>{name}</p>
        <p>{formatRupiah(price)}</p>
        <p>{qty}</p>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <Link to={`/produsen/edit-produk/${id}`} className="text-blue-600">
          Ubah
        </Link>
        <button onClick={handleDelete} className="text-red-600">
          Hapus
        </button>
      </div>
    </div>
  );
};

export default Product;
