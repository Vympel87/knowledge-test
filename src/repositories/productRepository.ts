import { db } from '../config/DB';
import { Product } from '../models/productModel';
import { RowDataPacket } from 'mysql2/promise';
import { base64ToString, stringToBase64 } from '../utils/conversionBase64';
import { deleteFileFromStorage } from '../utils/deleteFileStorage';

export const getProductById = async (id: number): Promise<Product | null> => {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM Product WHERE id = ?', [id]);
    const products = rows as Product[];

    if (products.length > 0) {
        const product = products[0];
        
        if (product.photo_produk) {
            product.photo_produk = base64ToString(product.photo_produk);
        }

        return product;
    } else {
        return null;
    }
};

export const listProducts = async (): Promise<Product[]> => {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM Product');
    const products = rows as Product[];

    products.forEach(product => {
        if (product.photo_produk) {
            product.photo_produk = base64ToString(product.photo_produk);
        }
    });

    return products;
};

export const createProduct = async (product: Product): Promise<void> => {
    const base64Photo = product.photo_produk ? stringToBase64(product.photo_produk) : null;
    const query = `
        INSERT INTO Product (nama_produk, stock, harga_produk, photo_produk, kategori_id) 
        VALUES (?, ?, ?, ?, ?)
    `;
    await db.query(query, [
        product.nama_produk, 
        product.stock, 
        product.harga_produk, 
        base64Photo, 
        product.kategori_id
    ]);
};

export const createProducts = async (products: Product[]): Promise<void> => {
    const query = `
        INSERT INTO Product (nama_produk, stock, harga_produk, photo_produk, kategori_id) 
        VALUES ?
    `;
    
    const values = products.map(product => {
        const base64Photo = product.photo_produk ? stringToBase64(product.photo_produk) : null;
        return [
            product.nama_produk, 
            product.stock, 
            product.harga_produk, 
            base64Photo, 
            product.kategori_id
        ];
    });

    await db.query(query, [values]);
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<void> => {
    const fields = Object.keys(product) as Array<keyof Product>;

    const values = fields.map(field => {
        if (field === 'photo_produk') {
            return product[field] ? stringToBase64(product[field] as string) : null;
        }
        return product[field] ?? null;
    });
    
    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    const query = `UPDATE Product SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE id = ?`;

    values.push(id);

    await db.query(query, values);
};

export const deleteProduct = async (id: number): Promise<void> => {
    const [rows] = await db.query<RowDataPacket[]>('SELECT photo_produk FROM Product WHERE id = ?', [id]);
    const products = rows as RowDataPacket[];

    if (products.length > 0) {
        const product = products[0] as { photo_produk: string };
        
        if (product.photo_produk) {
            const filename = base64ToString(product.photo_produk);
            deleteFileFromStorage(filename);
        }
    }

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