export interface Product {
    id?: number;
    nama_produk: string;
    stock: number;
    harga_produk: number;
    photo_produk?: string | null;
    kategori_id: number;
}