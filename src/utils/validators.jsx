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

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nama produk wajib diisi')
    .min(3, 'Nama produk minimal 3 karakter'),

  description: yup
    .string()
    .required('Deskripsi produk wajib diisi')
    .min(10, 'Deskripsi minimal 10 karakter'),

  price: yup
    .number()
    .typeError('Harga harus berupa angka')
    .required('Harga produk wajib diisi')
    .positive('Harga harus lebih dari 0'),

  stock: yup
    .number()
    .typeError('Stok harus berupa angka')
    .required('Stok produk wajib diisi')
    .min(0, 'Stok tidak boleh negatif'),

  image: yup
    .mixed()
    // .url('Masukkan URL gambar yang valid')
    .required('URL gambar wajib diisi')
    .test('fileExists', 'Gambar wajib diunggah', (value) => value && value.length > 0),
});