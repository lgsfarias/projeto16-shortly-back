import UrlRepository from '../repositories/UrlRepository.js';
import crypto from 'crypto';

export default class UrlsController {
    static createUrl = async (req, res) => {
        const { url } = req.body;
        const shortUrl = crypto.randomBytes(6).toString('base64');
        const shortUrlWithoutSlash = shortUrl.replace(/\//g, '');

        const userId = res.locals.user.id;

        try {
            const urlCreated = await UrlRepository.createUrl({
                url,
                shortUrl: shortUrlWithoutSlash,
                userId,
            });

            res.status(201).json({ shortUrl });
        } catch (error) {
            res.status(500).json(error);
        }
    };

    static getUrlById = async (req, res) => {
        const { id } = req.params;

        try {
            const url = await UrlRepository.getUrlById(id);

            if (!url) {
                return res.status(404).json({
                    message: 'Url not found',
                });
            }

            res.status(200).json({
                id: url.id,
                shortUrl: url.shortUrl,
                url: url.url,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    };

    static redirectUrl = async (req, res) => {
        const { shortUrl } = req.params;

        try {
            const url = await UrlRepository.getUrlByShortUrl(shortUrl);

            if (!url) {
                return res.status(404).json({
                    message: 'Url not found',
                });
            }

            await UrlRepository.IncreaseVisits(shortUrl);

            res.redirect(url.url);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    static deleteUrl = async (req, res) => {
        const { id } = req.params;

        const { user } = res.locals;

        try {
            const url = await UrlRepository.getUrlById(id);

            if (!url) {
                return res.status(404).json({
                    message: 'Url not found',
                });
            }

            if (url.userId !== user.id) {
                return res.status(401).json({
                    message: 'You are not authorized to delete this url',
                });
            }

            await UrlRepository.deleteUrl(id);

            res.status(204).json({
                message: 'Url deleted',
            });
        } catch (error) {
            res.status(500).json(error);
        }
    };
}
