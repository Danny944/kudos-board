import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Generate a JWT token
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRETKEY, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

// Verify a JWT token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    return decoded;
  } catch (error) {
    // Handle token verification error
    console.error('Token verification failed:', error.message);
    return null;
  }
};
