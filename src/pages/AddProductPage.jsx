import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { productSchema } from '../utils/validators';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProductPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(productSchema) });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('stock', data.stock);
    formData.append('image', data.image[0]); // ambil file dari array

    try {
      const response = await fetch('http://localhost:5000/api/products/tambah-produk', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Gagal menambahkan produk');

      toast.success('Produk berhasil ditambahkan!');
      navigate('/produsen/kelola-produk');
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className='w-full ps-10'>
      <p className="text-green-800 font-semibold text-[30px] mb-2">Tambah Produk</p>
      <div className='h-[5px] w-[90%] sm:h-[3px] bg-input mb-5'></div>

      <form onSubmit={
        handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[90%]"
        encType="multipart/form-data">

        <input
          type="text"
          placeholder="Nama Produk"
          {...register('name')}
          className="border-2 p-2 rounded"
          autoComplete='off' />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <textarea
          placeholder="Deskripsi Produk"
          {...register('description')}
          className="border-2 p-2 rounded" />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}

        <input
          type="number"
          placeholder="Harga"
          {...register('price')}
          className="border-2 p-2 rounded" />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}

        <input
          type="number"
          min="0"
          placeholder="Stok"
          {...register('stock')}
          className="border-2 p-2 rounded" />
        {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}

        {/* Input Gambar */}
        <input
          type="file"
          accept="image/*"
          {...register('image')}
          className="border-2 p-2 rounded" />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-input text-white py-2 rounded-md hover:bg-green-700">
          <Link to={'/produsen/kelola-produk'}>
            {isSubmitting ? 'Menyimpan...' : 'Simpan Produk'}
          </Link>
        </button>
      </form>

    </div >
  );
}
