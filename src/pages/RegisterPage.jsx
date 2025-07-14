import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../utils/validators';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import registerImg from '../assets/img/register.jpg';

export default function RegisterPage() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    const success = await registerUser(data);
    if (success) navigate('/login');
  };

  return (
    <div className="flex w-screen h-screen">
      <div
        className='w-1/2 h-screen'
        style={{
          backgroundImage: `url(${ registerImg })`,
          backgroundSize: 'cover'
        }}
      ></div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 h-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold pb-10">Registrasi</h1>
        <div className="flex flex-col gap-5 w-2/3">
          <input
            type="text"
            className='border-b outline-none p-2'
            {...register('username')}
            placeholder="Nama Lengkap" />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

          <input
            type="email"
            className='border-b outline-none p-2'
            {...register('email')}
            placeholder="Email" />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            className='border-b outline-none p-2'
            {...register('password')}
            placeholder="Password" />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

          <input
            type="text"
            className='border-b outline-none p-2'
            {...register('addres')}
            placeholder="Alamat" />
          {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}

          <select
            className="border-b outline-none p-2 bg-white"
            {...register('role')}
          >
            <option value="">Pilih Peran</option>
            <option value="produsen">Produsen</option>
            <option value="konsumen">Konsumen</option>
          </select>
          {errors.role && <p className="text-red-600 text-sm">{errors.role.message}</p>}
        </div>
        <div className='flex flex-col gap-5 pt-10 w-2/3'>
          <button
            className='bg-input text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50'
            disabled={isSubmitting}>
            {isSubmitting ? 'Mendaftar...' : 'Daftar'}
          </button>
          <p className="text-sm text-center">
            Sudah punya akun? <Link to="/login" className="text-blue-600">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}