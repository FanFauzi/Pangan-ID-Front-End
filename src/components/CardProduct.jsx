
export default function CardProduct({imgProduct, titleProduct, priceProduct, descProduct}) {
  return (
    <div className="w-full py-6 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden">

        <div
          className="h-64 md:h-auto md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgProduct})` }}
        ></div>

        <div className="px-6 py-3 flex flex-col justify-between md:w-1/2">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">{titleProduct}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {descProduct}
            </p>
          </div>
          <div className="flex justify-between items-center text-lg font-semibold text-gray-700">
            <span className='text-sm'>{priceProduct}</span>
            {/* <span className='text-sm'>10 kg terjual</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
