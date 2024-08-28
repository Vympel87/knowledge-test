import { Router } from 'express';
import {
    register,
    login
} from '../controllers/authenticationController';

const authRoutes: Router = Router();

authRoutes.post('/', register);
authRoutes.post('/login', login);

export default authRoutes;