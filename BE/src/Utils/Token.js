const Token = {
    createToken : (user) => {
        return jwt.sign(user, "NOISYBOY" , {expiresIn: '1h'});
    },
    verifyToken : (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        }
        jwt.verify(token, "NOISYBOY", function(err, decoded) {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            req.user = decoded;
            next();
        });
    }
} 