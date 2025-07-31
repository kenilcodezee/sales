import { NextFunction, Request, Response } from 'express';
import { getUserProfileService } from './user.service';

/**
 * Handles synchronization of user profile data using access tokens.
 * @example
 * sync(req, res, next)
 * // No explicit return value as it sends responses through res object.
 * @param {Request} req - Express request object containing headers and other request data.
 * @param {Response} res - Express response object used for sending back a response to the client.
 * @param {NextFunction} next - Express callback function to handle errors or pass control to the next middleware.
 * @returns {Promise<void>} Since responses are sent directly using `res`, there is no return value from the function itself.
 * @description
 *   - Checks for the presence of 'authorization' header.
 *   - Extracts and uses the access token from the 'authorization' header.
 *   - Calls `getUserProfileService` to obtain user profile data based on the access token.
 *   - Sends appropriate HTTP status code and JSON response containing user data or error message.
 */
export const getUserProfileController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const accessToken = authorization.split(' ')[1];
        const response = await getUserProfileService(accessToken);

        res.status(200).json({ message: 'User data fetched', data: response });
    } catch (error) {
        next(error);
    }
};
