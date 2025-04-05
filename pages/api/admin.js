import { withAuth } from '../../middleware/authMiddleware';

const Page = async (req, res, user) => {
  res.status(200).json({ message: `Welcome, You have admin access.` });
};

export default withAuth( Page, ['admin']);
