import db from '../config/database.js';
import sqlstring from 'sqlstring';

export default class UrlRepository {
    static createUrl = async ({ url, shortUrl, userId }) => {
        const query = sqlstring.format(
            'INSERT INTO urls (url, "shortUrl", "userId") VALUES (?, ?, ?) RETURNING *',
            [url, shortUrl, userId]
        );

        const { rows } = await db.query(query);

        return rows[0];
    };
}
