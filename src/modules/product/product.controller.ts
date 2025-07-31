import { NextFunction, Request, Response } from 'express';
import { getUserProfileService } from './product.service';

/**
* Handles synchronization of user profile data from an external service.
* @example
* sync(req, res, next)
* // Returns a JSON response with user data fetched from an external service
* @param {Request} req - The request object containing user details such as headers.
* @param {Response} res - The response object used to send back the desired HTTP response.
* @param {NextFunction} next - The next middleware function in the stack to handle errors.
* @returns {Promise<void>} Returns a promise resolving to no value, as the result is sent via the response object.
* @description
*   - Extracts the access token from the Authorization header to request user profile data.
*   - If the Authorization header is missing, sends a 404 status with an error message.
*   - On successful profile fetch, sends a 200 status with user data.
*   - Passes errors to the next middleware for handling.
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
