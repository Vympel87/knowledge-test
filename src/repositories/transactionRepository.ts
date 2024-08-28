import { db } from '../config/DB';
import { Transaction } from '../models/transactionModel';

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

export const updateTransaction = async (id: number, transaction: Partial<Transaction>): Promise<void> => {
    const fields = Object.keys(transaction) as Array<keyof Transaction>;
    const values = fields.map(field => transaction[field] ?? null);
    
    if (fields.length === 0) {
        throw new Error('No fields to update');
    }
    
    const query = `UPDATE Transaction SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE id = ?`;
    
    values.push(id);
    
    await db.query(query, values);
};

export const deleteTransaction = async (id: number): Promise<void> => {
    await db.query('DELETE FROM Transaction WHERE id = ?', [id]);
};
