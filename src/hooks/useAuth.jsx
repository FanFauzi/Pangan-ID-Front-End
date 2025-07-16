import { useAuthStore } from '../stores/authStore';
import { loginUser, registerNewUser } from '../services/authService.jsx';

export function useAuth() {
  const setUser = useAuthStore((state) => state.setUser);

  const login = async (email, password) => {
    try {
      const user = await loginUser(email, password);
      setUser(user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const registerUser = async (userData) => {
    try {
      const res = await registerNewUser(userData);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registrasi gagal');
      }
      console.log(data);
      return data;
    } catch (err) {
      alert(err.message);
      return false;
    }
  };

  return { login, registerUser };
}
