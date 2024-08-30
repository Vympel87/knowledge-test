import { z } from 'zod';

export const createProductsSchema = z.object({
    nama_produk: z.string(),
    stock: z.coerce.number().int().nonnegative(),
    harga_produk: z.coerce.number().nonnegative(),
    photo_produk: z.string().nullable().optional(),
    kategori_id: z.coerce.number().int().nonnegative()
});

export const createProductSchema = z.object({
    nama_produk: z.string(),
    stock: z.coerce.number(), 
    harga_produk: z.coerce.number(),
    photo_produk: z.string().optional(),
    kategori_id: z.coerce.number(),
});

export const updateProductSchema = z.object({
    nama_produk: z.string().optional(),
    stock: z.coerce.number().optional(),
    harga_produk: z.coerce.number().optional(),
    photo_produk: z.string().optional(),
    kategori_id: z.coerce.number().optional(),
});
