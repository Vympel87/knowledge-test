import { db } from '../config/DB';
import { Transaction } from '../models/transactionModel';
import { RowDataPacket } from 'mysql2/promise';


export const getTransactionById = async (id: number): Promise<Transaction | null> => {
    const [rows] = await db.query('SELECT * FROM Transaction WHERE id = ?', [id]);
    const transaction = rows as Transaction[];
    return transaction.length > 0 ? transaction[0] : null;
};

export const listTransactions = async (): Promise<Transaction[]> => {
    const [rows] = await db.query('SELECT * FROM Transaction');
    return rows as Transaction[];
};

export const createTransaction = async (transaction: Transaction): Promise<void> => {
    const { id_produk, jenis_transaksi } = transaction;
    const stockChange = jenis_transaksi === 'masuk' ? 1 : -1;

    await db.query('INSERT INTO Transaction (id_produk, jenis_transaksi) VALUES (?, ?)', [id_produk, jenis_transaksi]);
    await db.query('UPDATE Product SET stock = stock + ? WHERE id = ?', [stockChange, id_produk]);
};

export const updateTransaction = async (id: number, transaction: Transaction): Promise<void> => {
    const [originalTransaction] = await db.query<RowDataPacket[]>(
        'SELECT * FROM Transaction WHERE id = ?', [id]
    );

    if (originalTransaction.length === 0) {
        throw new Error('Transaction Not Found');
    }

    const { id_produk, jenis_transaksi } = transaction;

    if (originalTransaction[0].id_produk !== id_produk || originalTransaction[0].jenis_transaksi !== jenis_transaksi) {
        const stockChangeNew = originalTransaction[0].jenis_transaksi === 'masuk' ? -1 : 1;
        await db.query(
            'UPDATE Product SET stock = stock + ? WHERE id = ?',
            [stockChangeNew, originalTransaction[0].id_produk]
        );
    } else {
        const stockChangeSame = jenis_transaksi === 'masuk' ? 1 : -1;
        await db.query(
            'UPDATE Product SET stock = stock + ? WHERE id = ?',
            [stockChangeSame, id_produk]
        );
    }

    await db.query(
        'UPDATE Transaction SET id_produk = ?, jenis_transaksi = ? WHERE id = ?',
        [id_produk, jenis_transaksi, id]
    );
};

export const deleteTransaction = async (id: number): Promise<void> => {
    await db.query('DELETE FROM Transaction WHERE id = ?', [id]);
};
