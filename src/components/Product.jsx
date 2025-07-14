import { Link } from 'react-router-dom';

const Product = ({ id, name, img, price, qty }) => {
  // const navigate = useNavigate();

  const handleEdit = () => {
    // navigate(`produsen/edit-produk/${id}`);
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };


  return (
    <div className='flex w-[90%] justify-between pb-5 ps-5'>
      {/* <input type="checkbox" name="" id="" /> */}
      <div className='w-[10%] flex justify-center'>
        <img src={`http://localhost:5000${img}`} alt="Product" className='rounded-[5px]' />
      </div>
      <div className='flex w-[80%] justify-around items-center'>
        <p>{name}</p>
        <p>{formatRupiah(price)}</p>
        <p>{qty}</p>
        {/* <p>{total}</p> */}
      </div>
      <div className='flex justify-center items-center'>
        <button onClick={handleEdit} className="text-blue-600 hover:underline">
        <Link to={`/produsen/edit-produk/${id}`}>
          Ubah
        </Link>
        </button>
      </div>
    </div>
  )
}

export default Product
