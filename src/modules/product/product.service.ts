import { repo } from './product.repo';
import { CustomError } from '@/utils/custom-error';
import { verifyJWT } from '@/middlewares/jwt.service';
import { JWT_ACCESS_TOKEN_SECRET } from '@/config';

/**
* Retrieves user profile using the decoded JWT's userId.
* @example
* sync("sampleAccessToken")
* { id: "user123", name: "John Doe", ... }
* @param {string} accessToken - JWT to be verified for authentication.
* @returns {Object} User profile object associated with the given token.
* @description
*   - Verifies the JWT using a secret key to decode and retrieve userId.
*   - Throws a 'User not found' error with a 404 status if user profile does not exist.
*/
export const getUserProfileService = async (accessToken: string) => {
    const decodeToken = await verifyJWT(
        accessToken,
        JWT_ACCESS_TOKEN_SECRET as string,
    );

    const userId = decodeToken.userId;

    const user = await repo.getUserProfile(userId);
    if (!user) {
        throw new CustomError('User not found', 404);
    }

    return user;
};
