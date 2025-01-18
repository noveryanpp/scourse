import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });

const apiKey = process.env.API_KEY


export const apiMiddleware = (req, res, next) => {
    if (
        req.headers['x-api-key'] &&
        req.headers['x-api-key'] == apiKey
    ) {
        next();
    } else {
        return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }
};