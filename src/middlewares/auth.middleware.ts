import { CustomError } from '@/utils/custom-error';
import { verifyJWT } from './jwt.service';
import { JWT_ACCESS_TOKEN_SECRET } from '@/config';
import { NextFunction, Request, Response } from 'express';

const decodeToken = async (header: string | undefined) => {
    if (!header) {
        throw new CustomError('Authorization header missing', 401);
    }

    const token = header.replace('Bearer ', '');
    const payload = await verifyJWT(token, JWT_ACCESS_TOKEN_SECRET as string);

    return payload;
};

/**
* Handles authentication middleware, decoding token and adding user context to request.
* @example
* sync(req, res, next)
* Proceeds to next middleware or route handler after token validation.
* @param {Request} req - Express request object containing HTTP request info.
* @param {Response} res - Express response object for HTTP response handling.
* @param {NextFunction} next - Function to pass control to the next middleware.
* @returns {void} Adds decoded token context to the request or calls next with error.
* @description
*   - Skips token decoding for 'OPTIONS' method and '/api/auth/signin' path.
*   - Uses 'Authorization' header to fetch token for decoding.
*   - Handles errors by passing them to next middleware/error handler.
*/
export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { method, path } = req;

    if (method === 'OPTIONS' || ['/api/auth/signin'].includes(path)) {
        return next();
    }

    try {
        const authHeader =
            req.header('Authorization') || req.header('authorization');
        req.context = await decodeToken(authHeader);
        next();
    } catch (error) {
        next(error);
    }
};
