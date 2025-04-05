import { withAuth } from '../../middleware/authMiddleware';

const Page = async (req, res, user) => {
  res.status(200).json({ message: `Hello, You have user access.` });
};

export default withAuth( Page, ['user', 'admin']);
