// src/services/authService.js

const BASE_URL = 'http://localhost:5000/api/auth';

export async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email, password),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Gagal login');
  }

  // Simpan token ke localStorage
  localStorage.setItem('token', result.token);

  return result.user || { email }; // sesuaikan dengan response backend
}

export async function registerNewUser(data) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
}
