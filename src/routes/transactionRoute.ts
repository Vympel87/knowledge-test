import { Router } from 'express';
import {
    createTransactionController,
    getTransactionController,
    listTransactionsController,
    updateTransactionController,
    deleteTransactionController
} from '../controllers/transactionController';

const transactionRoutes: Router = Router();

transactionRoutes.post('/', createTransactionController);
transactionRoutes.get('/', listTransactionsController);
transactionRoutes.get('/:id', getTransactionController);
transactionRoutes.put('/:id', updateTransactionController);
transactionRoutes.delete('/:id', deleteTransactionController);

export default transactionRoutes;