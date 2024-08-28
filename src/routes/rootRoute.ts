import { Router } from 'express';
import authRoutes from './authRoute';
import productRoutes from './productRoute';
import transactionRoutes from './transactionRoute';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/product', productRoutes);
rootRouter.use('/transaction', transactionRoutes);

export default rootRouter;