import { Buffer } from 'buffer';
import path from 'path';
import fs from 'fs';

export const base64ToString = (base64String: string): string => {
    return Buffer.from(base64String, 'base64').toString('utf-8');
};

export const stringToBase64 = (string: string): string => {
    return Buffer.from(string).toString('base64');
};

export const stringToBase64Bulk = (filename: string): string => {
    const filePath = path.join(__dirname, '../storage/images', filename);
    const fileBuffer = fs.readFileSync(filePath);
    return fileBuffer.toString('base64');
};
