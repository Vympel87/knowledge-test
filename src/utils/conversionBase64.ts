import { Buffer } from 'buffer';

export const base64ToString = (base64String: string): string => {
    return Buffer.from(base64String, 'base64').toString('utf-8');
};

export const stringToBase64 = (string: string): string => {
    return Buffer.from(string).toString('base64');
};
