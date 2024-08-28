export interface Transaction {
    id?: number;
    timestamp?: Date;
    id_produk: number;
    jenis_transaksi: 'masuk' | 'keluar';
}