import jwt from 'jsonwebtoken';

export const generateJWT = async (payload: any, secretKey: string) => {
    try {
        const token = `Bearer ${jwt.sign(payload, secretKey)}`;
        return token;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

/**
* Verifies and decodes a JWT token asynchronously
* @example
* sync("Bearer eyJhbGciOiJIUzI1NiIsInR...", "your-secret-key")
* Promise<JwtPayload>
* @param {string} token - JWT token prefixed with 'Bearer '
* @param {string} secretKey - Secret key used for verifying the token
* @returns {Promise<jwt.JwtPayload>} Decoded JWT payload
* @description
*   - Uses the secret key to verify the provided token after removing 'Bearer ' prefix.
*   - Throws an error if the token payload is invalid or if verification fails.
*/
export const verifyJWT = async (
    token: string,
    secretKey: string,
): Promise<jwt.JwtPayload> => {
    try {
        const cleanedToken = token.replace('Bearer ', '');
        const data = jwt.verify(cleanedToken, secretKey);

        if (typeof data === 'string') {
            throw new Error('Invalid token payload');
        }

        return data as jwt.JwtPayload;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
