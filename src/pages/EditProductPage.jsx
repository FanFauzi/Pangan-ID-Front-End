import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 

export default function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/produk/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        reset({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          image: data.image
        });
      } catch (err) {
        console.error('Gagal ambil data produk:', err);
      }
    };

    fetchProduct();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('stock', data.stock);

    // hanya jika ada file baru yang diupload
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/produk/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
          // jangan set Content-Type kalau pakai FormData
        },
        body: formData
      });

      const result = await response.json();

      console.log(result)

      if (!response.ok) throw new Error(result.message || 'Gagal update produk');

      toast.success('Produk berhasil diupdate!');
      navigate('../../produsen/kelola-produk');
    } catch (err) {
      console.error('Error saat update:', err.message);
      toast.error('Terjadi kesalahan saat update produk');
    }
  };

  return (
    <div className='w-full ps-10'>
      <p className="text-green-800 font-semibold text-[30px] mb-2">Edit Produk</p>
      <div className='h-[5px] w-[90%] sm:h-[3px] bg-input mb-5'></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[90%]"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Nama Produk"
          {...register('name')}
          className="border-2 p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <textarea
          placeholder="Deskripsi Produk"
          {...register('description')}
          className="border-2 p-2 rounded"
        />

        <input
          type="number"
          placeholder="Harga"
          {...register('price')}
          className="border-2 p-2 rounded"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

        <input
          type="number"
          min="0"
          placeholder="Stok"
          {...register('stock')}
          className="border-2 p-2 rounded"
        />
        {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}

        <input
          type="file"
          accept="image/*"
          {...register('image')}
          className="border-2 p-2 rounded"
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

        <button
          type="submit"
          className="bg-input text-white py-2 rounded-md hover:bg-green-700"
          disabled={isSubmitting}
        >
          <Link to="/produsen/kelola-produk" >
            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
          </Link>
        </button>
      </form>
    </div>
  );
}
