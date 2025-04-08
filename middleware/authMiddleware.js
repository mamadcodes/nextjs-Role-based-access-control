import dbConnect from '@/utils/db';
import User from '@/models/User';
import { verifyToken } from '../utils/auth';

export const withAuth = (handler, requiredRoles) => {
  return async (req, res) => {
    await dbConnect();
    if(!req.headers.cookie){
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
    }
    const token = await req.headers.cookie.split("token=")[1] // Get JWT Token from cookies
    const decoded = verifyToken(token); // Verify receivet JWT Token
    const userId = decoded.userId // Use verified JWT Token response, to extract user ID
    
    
    const user = await User.findById(userId);
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: No user ID provided.' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found.' });
    }

    if (!requiredRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
    }

    return handler(req, res, user);
  };
};
