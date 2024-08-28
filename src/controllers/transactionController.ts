import { Request, Response } from 'express';
import { z } from 'zod';
import { createTransactionSchema, updateTransactionSchema } from '../schemas/transactionSchema';
import {
    createTransaction,
    getTransactionById,
    listTransactions,
    updateTransaction,
    deleteTransaction
} from '../repositories/transactionRepository';

export const createTransactionController = async (req: Request, res: Response) => {
    try {
        const validatedData = createTransactionSchema.parse(req.body);
        await createTransaction(validatedData);
        res.status(201).json({ message: 'Transaction Created!' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Validation Error', errors: error.errors });
        }
        res.status(500).json({ message: 'Something Went Wrong' });
    }
};

export const getTransactionController = async (req: Request, res: Response) => {
    try {
        const transaction = await getTransactionById(Number(req.params.id));
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction Not Found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong' });
    }
};

export const listTransactionsController = async (req: Request, res: Response) => {
    try {
        const transactions = await listTransactions();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong' });
    }
};

export const updateTransactionController = async (req: Request, res: Response) => {
    try {
        const validatedData = updateTransactionSchema.parse(req.body);
        await updateTransaction(Number(req.params.id), validatedData);
        res.status(200).json({ message: 'Transaction Updated!' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Validation Error', errors: error.errors });
        }
        res.status(500).json({ message: 'Something Went Wrong' });
    }
};

export const deleteTransactionController = async (req: Request, res: Response) => {
    try {
        await deleteTransaction(Number(req.params.id));
        res.status(200).json({ message: 'Transaction Deleted!' });
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong' });
    }
};
