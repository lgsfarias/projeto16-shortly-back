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

    static getUserById = async (id) => {
        const query = sqlstring.format('SELECT * FROM users WHERE id = ?', [
            id,
        ]);

        const { rows } = await db.query(query);

        return rows[0];
    };

    static getUserByIdWithUrlsRelationship = async (id) => {
        const query = sqlstring.format(
            `SELECT users.id,
            users.name,
            SUM(urls."visitCount") AS "visitCount",
            json_agg(json_build_object(
                'id', urls.id,
                'url', urls.url,
                'shortUrl', urls."shortUrl",
                'visitCount', urls."visitCount"
            )) AS urls
            FROM users 
            JOIN urls ON urls."userId" = users.id
            WHERE users.id = ? 
            GROUP BY users.id, users.name`,
            [id]
        );

        const { rows } = await db.query(query);

        return rows[0];
    };
}
