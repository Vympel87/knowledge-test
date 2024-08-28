import { db } from '../config/DB';
import { Product } from '../models/productModel';
import { RowDataPacket } from 'mysql2/promise';

export const getProductById = async (id: number): Promise<Product | null> => {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM Product WHERE id = ?', [id]);
    const products = rows as Product[];
    return products.length > 0 ? products[0] : null;
};

export const listProducts = async (): Promise<Product[]> => {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM Product');
    return rows as Product[];
};

export const createProduct = async (product: Product): Promise<void> => {
    const query = `
        INSERT INTO Product (nama_produk, stock, harga_produk, photo_produk, kategori_id) 
        VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(query, [
        product.nama_produk, 
        product.stock, 
        product.harga_produk, 
        product.photo_produk ?? null, 
        product.kategori_id
    ]);
};

export const createProducts = async (products: Product[]): Promise<void> => {
    const query = `
        INSERT INTO Product (nama_produk, stock, harga_produk, photo_produk, kategori_id) 
        VALUES ?
    `;
    const values = products.map(product => [
        product.nama_produk, 
        product.stock, 
        product.harga_produk, 
        product.photo_produk ?? null, 
        product.kategori_id
    ]);

    await db.query(query, [values]);
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<void> => {
    const fields = Object.keys(product) as Array<keyof Product>;
    const values = fields.map(field => product[field] ?? null);
    
    if (fields.length === 0) {
        throw new Error('No fields to update');
    }
    
    const query = `UPDATE Product SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE id = ?`;
    
    values.push(id);
    
    await db.query(query, values);
};

export const deleteProduct = async (id: number): Promise<void> => {
    await db.query('DELETE FROM Product WHERE id = ?', [id]);
};

export const getTotalProductsAbovePrice = async (price: number): Promise<number> => {
    const [rows] = await db.query<RowDataPacket[]>(
        'SELECT COUNT(*) AS total FROM Product WHERE harga_produk > ?',
        [price]
    );
    const result = rows[0] as { total: number };
    return result.total;
};
