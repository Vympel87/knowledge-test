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
import upload, { multerErrorHandler } from '../middlewares/uploadMiddleware'; 

const productRoutes: Router = Router();

productRoutes.post('/', upload.single('photo_produk'), createProductController);
productRoutes.post('/masal', upload.array('photo_produk'), createProductsController);
productRoutes.get('/', listProductsController);
productRoutes.get('/total-price', getTotalProductsAbovePriceController);
productRoutes.get('/:id', getProductController);
productRoutes.put('/:id', upload.single('photo_produk'), updateProductController);
productRoutes.delete('/:id', deleteProductController);

productRoutes.use(multerErrorHandler);

export default productRoutes;
