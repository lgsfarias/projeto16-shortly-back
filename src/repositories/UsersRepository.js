import db from '../config/database.js';
import sqlstring from 'sqlstring';

export default class UsersRepository {
    static createUser = async ({ name, password, email }) => {
        const query = sqlstring.format(
            'INSERT INTO users (name, password, email) VALUES (?, ?, ?) RETURNING *',
            [name, password, email]
        );

        const { rows } = await db.query(query);

        return rows[0];
    };

    static getUserByEmail = async (email) => {
        const query = sqlstring.format('SELECT * FROM users WHERE email = ?', [
            email,
        ]);

        const { rows } = await db.query(query);

        return rows[0];
    };

    static getUserByEmail = async (email) => {
        const query = sqlstring.format('SELECT * FROM users WHERE email = ?', [
            email,
        ]);

        const { rows } = await db.query(query);

        return rows[0];
    };
}
