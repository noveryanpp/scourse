const apiKey = "scourse_api_key_2024";

export const apiMiddleware = (req, res, next) => {
    if (
        req.headers.x-api-key &&
        req.headers.x-api-key == apiKey
    ) {
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }
};