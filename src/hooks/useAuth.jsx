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

  const registerUser = async (data) => {
    try {
      const user = await registerNewUser(data);
      setUser(user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return { login, registerUser };
}
