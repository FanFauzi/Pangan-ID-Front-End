import { useEffect, useState } from 'react';
import Product from '../components/Product';

const KelolaProdukPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Gagal mengambil produk');

        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='pt-3 w-full h-full px-10'>
      <div className='sm:text-sm md:text-base'>
        <h1 className="text-green-800 font-semibold text-2xl mb-1">Produk</h1>
        <div className='h-[5px] w-[90%] sm:h-[3px] bg-input mb-5'></div>
      </div>
      <div className="flex flex-col">
        {products.map(product => (
          <Product 
          id={product.id}
          name={product.name}
          img={product.image_url}
          key={product.id}
          price={product.price}
          qty={product.stock}
          // total={product.price * product.stock}
          />
        ))}
      </div>
    </div>
  );
};

export default KelolaProdukPage;
