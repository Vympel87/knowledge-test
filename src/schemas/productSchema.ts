import { z } from 'zod';

export const createProductSchema = z.object({
    nama_produk: z.string().min(1, 'Nama produk harus diisi'),
    stock: z.number().int().nonnegative('Stock harus berupa angka positif'),
    harga_produk: z.number().positive('Harga produk harus lebih dari 0'),
    photo_produk: z.string().optional().nullable(),
    kategori_id: z.number().int().positive('Kategori ID harus lebih dari 0')
});

export const updateProductSchema = createProductSchema.partial();

export const createProductsSchema = z.object({
    nama_produk: z.string(),
    stock: z.number().int().nonnegative(),
    harga_produk: z.number().nonnegative(),
    photo_produk: z.string().nullable(),
    kategori_id: z.number().int().nonnegative()
});
