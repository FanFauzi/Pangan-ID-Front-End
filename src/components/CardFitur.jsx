// import kelolaProduk from '../assets/img/kelolaProduk.png';

export default function CardFitur({ imgFitur, titleFitur }) {
  return (
    <div className="w-full flex justify-center px-4 cursor-pointer">
      {/* <a href="kelola-produk"> */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center rounded-2xl bg-white py-5 px-6 gap-4 shadow-md">
          <div className="image-fitur flex justify-center md:justify-start w-full md:w-1/2">
            <img src={imgFitur} alt="produkFitur" className="w-[60%] md:w-[80%] object-contain" />
          </div>
          <div className="text-center md:text-left w-full md:w-1/2">
            <p className="text-xl md:text-2xl font-bold text-gray-800">{titleFitur}</p>
          </div>
        </div>
      {/* </a> */}
    </div>
  );
}
