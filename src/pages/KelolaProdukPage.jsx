// import Header from '../components/Header'
import Product from '../components/Product';
import Header from '../components/header';

const KelolaProdukPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-neutral-100">
      <Header />
      <div className='flex h-full'>
        <div className='w-1/4 h-full px-10 md:text-2xl sm:text-[12px] pt-5 font-medium bg-white'>
          <h3><a href="#">Pesanan</a></h3>
          <h3 className='py-1'><a href="#">Produk</a></h3>
          <h3><a href="#">Tambah Produk</a></h3>
        </div>
        <div className='pt-3 w-3/4 pl-10'>
          <div className='sm:text-[12px] md:text-[15px]'>
            <h1>Pesanan</h1>
            <div className='h-[5px] w-[90%] sm:h-[3px] bg-input mb-5'></div>
          </div>
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </div>
  )
}

export default KelolaProdukPage;
