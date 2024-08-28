import { z } from 'zod';

export const createTransactionSchema = z.object({
    id_produk: z.number().min(1, "Product ID must be greater than 0"),
    jenis_transaksi: z.enum(['masuk', 'keluar'])
});

export const updateTransactionSchema = z.object({
    id_produk: z.number().optional(),
    jenis_transaksi: z.enum(['masuk', 'keluar']).optional(),
    timestamp: z.date().optional()
});
