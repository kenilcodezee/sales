import { repo } from './user.repo';
import { CustomError } from '@/utils/custom-error';
import { verifyJWT } from '@/middlewares/jwt.service';
import { JWT_ACCESS_TOKEN_SECRET } from '@/config';

/**
 * Fetches user profile using the provided access token.
 * @example
 * sync("sampleAccessToken")
 * { id: "123", name: "John Doe", email: "john.doe@example.com" }
 * @param {string} accessToken - JWT used for authenticating and identifying the user.
 * @returns {Object} Returns the user profile object.
 * @description
 *   - Verifies the validity of the provided JWT using the secret key.
 *   - Throws a 'User not found' error with a 404 status if the user does not exist.
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
