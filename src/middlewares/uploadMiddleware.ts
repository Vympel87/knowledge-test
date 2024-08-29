import multer, { MulterError } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        const dir = path.join(__dirname, '../storage/images');

        fs.access(dir, fs.constants.F_OK, (err) => {
            if (err) {
                fs.mkdir(dir, { recursive: true }, (mkdirErr) => {
                    if (mkdirErr) {
                        return cb(mkdirErr as any, dir);
                    }
                    cb(null, dir);
                });
            } else {
                cb(null, dir);
            }
        });
    },
    filename: (req: Request, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        return cb(new Error('Only images are allowed (jpg, jpeg, png)') as any, false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
});

export const multerErrorHandler = (err: any, req: Request, res: Response, next: Function) => {
    if (err instanceof MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size exceeds the 2 MB limit.' });
        }
        return res.status(400).json({ error: `Multer error: ${err.message}` });
    } else if (err) {
        return res.status(400).json({ error: `Error: ${err.message}` });
    }
    next();
};

export default upload;
