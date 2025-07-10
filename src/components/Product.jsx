import Beef from '../assets/img/product/beef.jpg'

const Product = () => {
  return (
      <div className='flex w-[90%] justify-between pb-5'>
        <input type="checkbox" name="" id="" />
        <div className='flex w-[80%] justify-around items-center'>
          <div className='w-[10%] flex justify-center'>
            <img src={Beef} alt="Product" className='rounded-[5px]' />
          </div>
          <p className=''>Produk</p>
          <p>Harga</p>
          <p>Qty</p>
          <p>Total</p>
        </div>
        <div className='flex justify-center items-center'>
          <p>ubah</p>
        </div>
      </div>
  )
}

export default Product
