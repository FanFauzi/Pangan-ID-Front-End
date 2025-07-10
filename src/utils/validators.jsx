import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: yup.string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
});

export const registerSchema = yup.object({
  name: yup.string().required('Nama wajib diisi'),
  email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: yup.string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
});
