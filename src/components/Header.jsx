import iconPerson from '../assets/person.svg'
import iconBasket from '../assets/basket.svg'
import iconNotif from '../assets/notif.svg'
import Search from './Search';

export default function Header() {
  return (
    <div className="w-full h-20 flex items-center justify-between px-10 bg-input">
      <p className="text-2xl font-bold text-amber-50">
        <a href="dashboard" className="text-2xl font-bold text-amber-50 hover:text-amber-200">
          PanganID
        </a>
      </p>
      <Search />
      <div className="icon flex">
        <img src={iconNotif} alt="Person" className='h-5' />
        <img src={iconBasket} alt="Person" className='h-5 px-4' />
        <img src={iconPerson} alt="Person" className='h-5' />
      </div>
    </div>
  );
}
