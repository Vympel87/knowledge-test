import { Router } from 'express';
import {
    createProductController,
    createProductsController,
    getProductController,
    listProductsController,
    updateProductController,
    deleteProductController,
    getTotalProductsAbovePriceController
} from '../controllers/productController';

const productRoutes: Router = Router();

productRoutes.post('/', createProductController);
productRoutes.post('/masal', createProductsController);
productRoutes.get('/', listProductsController);
productRoutes.get('/total-price', getTotalProductsAbovePriceController);
productRoutes.get('/:id', getProductController);
productRoutes.put('/:id', updateProductController);
productRoutes.delete('/:id', deleteProductController);

export default productRoutes;