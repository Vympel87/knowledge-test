import path from "path";
import fs from 'fs';

export const deleteFileFromStorage = (filename: string): void => {
    const filePath = path.join(__dirname, '../storage/images', filename);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file ${filename}:`, err);
        } else {
            console.log(`File ${filename} deleted successfully.`);
        }
    });
};