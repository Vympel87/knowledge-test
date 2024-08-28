import { db } from '../config/DB';
import { User } from '../models/userModel';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';

export const registerUser = async (user: User): Promise<void> => {
    const { username, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO User (username, password) VALUES (?, ?)', [username, hashedPassword]);
};

export const getUserByUsername = async (username: string): Promise<User | null> => {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM User WHERE username = ?', [username]);

    const result = rows[0] as User | undefined;

    return result || null;
};
