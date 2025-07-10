import farmer from '../assets/img/farmer.svg'

export default function Jumbotron() {
  return (
    <div className="w-screen flex flex-col items-center py-10">
      <div className="w-[90%] flex justify-between rounded-2xl bg-input h-60 p-10">
        <div className="text-jumbotron w-3/4 flex flex-col justify-center">
          <p className="text-white font-bold text-3xl pb-3">Digitalisasi Pangan untuk Masa Depan</p>
          <p className="text-white text-l">
          PanganId hadir untuk menyederhanakan distribusi, <br/>
            mempercepat akses, <br/>
            dan meningkatkan ketahanan pangan nasional.</p>
        </div>
          <img src={farmer} alt="farmer" className='h-full' />
      </div>
    </div>
  );
}
