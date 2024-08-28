import { Request, Response } from 'express';
import { z } from 'zod';
import { createProductsSchema, createProductSchema, updateProductSchema } from '../schemas/productSchema';
import { createProduct, createProducts, getProductById, listProducts, updateProduct, deleteProduct, getTotalProductsAbovePrice } from '../repositories/productRepository';

export const createProductController = async (req: Request, res: Response) => {
    try {
        const validatedData = createProductSchema.parse(req.body);
        await createProduct(validatedData);
        res.status(201).json({ message: 'Product Added!' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Validation Error', errors: error.errors });
        }
        res.status(500).json({ message: 'Something Went Wrong' });
    }
};

export const createProductsController = async (req: Request, res: Response) => {
    try {
        const validatedData = z.array(createProductsSchema).parse(req.body);
        await createProducts(validatedData);
        res.status(201).json({ message: 'Products Added!' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Validation Error', errors: error.errors });
        }
        res.status(500).json({ message: 'Something Went Wrong' });
    }
};

export const getProductController = async (req: Request, res: Response) => {
    try {
        const product = await getProductById(Number(req.params.id));
        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong' });
    }
};

export const listProductsController = async (req: Request, res: Response) => {
    try {
        const products = await listProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Something Went Wrong' });
    }
};

export const updateProductController = async (req: Request, res: Response) => {
    try {
        const validatedData = updateProductSchema.parse(req.body);
        await updateProduct(Number(req.params.id), validatedData);
        res.status(200).json({ message: 'Product Updated!' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Validation Error', errors: error.errors });
        }
        res.status(500).json({ message: 'Something Went Wrong' });
    }
};

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        await deleteProduct(Number(req.params.id));
        res.status(200).json({ message: 'Product Deleted!' });
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong' });
    }
};

export const getTotalProductsAbovePriceController = async (req: Request, res: Response) => {
    try {
        const price = 80000;
        const total = await getTotalProductsAbovePrice(price);
        res.json({ total });
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong' });
    }
};
