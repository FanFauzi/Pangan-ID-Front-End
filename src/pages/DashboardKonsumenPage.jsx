import Header from "../components/header";
import Jumbotron from "../components/Jumbotron"
import CardFitur from "../components/CardFitur"
import CardProduct from "../components/CardProduct"
import kelolaProduk from '../assets/img/kelolaProduk.png';
import transaksi from '../assets/img/transaksi.png';
import harga from '../assets/img/harga.png';
import BeefCard from '../assets/img/product/beef.jpg';


export default function DashboardProdusenPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-neutral-100 overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Jumbotron />
        <div className="card-fitur w-screen flex px-15 gap-10">
          <CardFitur imgFitur={kelolaProduk} titleFitur="Kelola Produk" />
          <CardFitur imgFitur={transaksi} titleFitur="Transaksi" />
          <CardFitur imgFitur={harga} titleFitur="Harga" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800 px-15 pt-8">Produk Terbaru</p>
          <div className="card-produk grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-15 py-4">
            <CardProduct
              imgProduct={BeefCard}
              titleProduct="Daging Sapi"
              descProduct="Daging sapi segar berkualitas premium langsung dari peternakan."
              priceProduct="Rp. 20.000/kg"
            />
            <CardProduct
              imgProduct={BeefCard}
              titleProduct="Daging Sapi"
              descProduct="Daging sapi segar berkualitas premium langsung dari peternakan."
              priceProduct="Rp. 20.000/kg"
            />
            <CardProduct
              imgProduct={BeefCard}
              titleProduct="Daging Sapi"
              descProduct="Daging sapi segar berkualitas premium langsung dari peternakan."
              priceProduct="Rp. 20.000/kg"
            />
            <CardProduct
              imgProduct={BeefCard}
              titleProduct="Daging Sapi"
              descProduct="Daging sapi segar berkualitas premium langsung dari peternakan."
              priceProduct="Rp. 20.000/kg"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
