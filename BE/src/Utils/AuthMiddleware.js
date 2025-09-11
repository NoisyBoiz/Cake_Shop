import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "NOISYBOY";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access token missing' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

export function authorizeRole(role) {
    return function (req, res, next) {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden: insufficient role' });
        }
        next();
    };
}
