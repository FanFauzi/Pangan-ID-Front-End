import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginSchema } from '../utils/validators';
import registerImg from '../assets/img/register.jpg';

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      localStorage.setItem('token', result.token); // Simpan token JWT
      toast.success('Login berhasil!');
      navigate('/produsen/dashboard');
    } catch (error) {
      toast.error(error.message || 'Terjadi kesalahan saat login');
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <div
        className='w-1/2 h-screen'
        style={{
          backgroundImage: `url(${registerImg})`,
          backgroundSize: 'cover',
        }}
      ></div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 h-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold pb-10">Login</h1>
        <div className="flex flex-col gap-5 w-[300px]">
          <input
            type="email"
            className="border-b outline-none p-2"
            {...register('email')}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            className="border-b outline-none p-2"
            {...register('password')}
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="flex flex-col gap-5 pt-10">
          <button
            type="submit"
            className="bg-input text-white py-2 rounded-md hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Masuk...' : 'Masuk'}
          </button>
          <p className="text-sm">
            Belum punya akun? <Link to="/register" className="text-blue-600">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
