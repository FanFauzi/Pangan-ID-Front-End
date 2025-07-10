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
          backgroundImage: `url(${registerImg})`,
          backgroundSize: 'cover'
        }}
      ></div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 h-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold pb-10">Registrasi</h1>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            className='border-b outline-none p-2'
            {...register('name')}
            placeholder="Nama Lengkap" />

          {errors.name && <p>{errors.name.message}</p>}

          <input
            type="email"
            className='border-b outline-none p-2'
            {...register('email')}
            placeholder="Email" />

          {errors.email && <p>{errors.email.message}</p>}

          <input
            type="password"
            className='border-b outline-none p-2'
            {...register('password')}
            placeholder="Password" />

          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className='flex flex-col gap-5 pt-10'>
          <button
            className='bg-input text-white py-2 rounded-md hover:not-focus:bg-green-700'
            disabled={isSubmitting}>{isSubmitting ?
              'Mendaftar...'
              :
              'Daftar'}</button>
          <p className="text-sm">
            Sudah punya akun? <Link to="/login" className="text-blue-600">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
