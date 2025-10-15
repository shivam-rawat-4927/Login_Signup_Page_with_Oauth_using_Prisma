import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const googleLoginController = async (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.redirect(`http://localhost:3000/dashboard?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: req.user.id,
      email: req.user.email,
      username: req.user.username,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      avatar: req.user.avatar
    }))}`);
};