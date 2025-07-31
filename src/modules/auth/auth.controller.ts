import { NextFunction, Request, Response } from 'express';
import { signInService, signUpService } from './auth.service';

/**
* Handles user signup process and sends a response back.
* @example
* sync(req, res, next)
* Successfully signed up response
* @param {Request} req - The request object containing user signup data.
* @param {Response} res - The response object used to return data or errors.
* @param {NextFunction} next - The next middleware function to handle errors.
* @returns {Promise<void>} Sends a JSON response with a signup success message and user data.
* @description
*   - Uses signUpService to validate and save user data.
*   - Responds with a 201 status on successful signup.
*   - Passes any caught errors to the next middleware function.
*/
export const signUpController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const userData = req.body;
        const response = await signUpService(userData);

        res.status(201).json({
            message: 'Successfully signed up',
            data: response.user,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Handles user sign-in by processing request data and providing appropriate response.
 * @example
 * sync(req, res, next)
 * undefined (as it returns a Promise<void>)
 * @param {Request} req - Express request object containing user data in the body.
 * @param {Response} res - Express response object used to send back the sign-in result.
 * @param {NextFunction} next - Function to pass control to the next middleware in case of errors.
 * @returns {Promise<void>} A promise that resolves with no value once operation is complete.
 * @description
 *   - Uses an asynchronous service call to handle sign-in logic.
 *   - Responds with a status code of 200 upon successful sign-in.
 *   - Forwards errors to the next middleware using `next(error)`.
 */
export const signInController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const userData = req.body;
        const response = await signInService(userData);

        res.status(200).json({
            message: 'Successfully signed in',
            data: response,
        });
    } catch (error) {
        next(error);
    }
};
