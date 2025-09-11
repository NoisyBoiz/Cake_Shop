
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

const Token = {
    createToken: (user) => {
        return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
    }
};

export default Token;