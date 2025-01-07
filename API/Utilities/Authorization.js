import jwt from "jsonwebtoken";

const secretKey = ':E@v8PWx%3T+2O5,Gsioj/nFll<*Q2?=bJ*#VUOTbuq]u@;Z[)GorgI0+=esK^q';

const createToken = (data) => {
    return jwt.sign(data, secretKey, { expiresIn: '1h' });
}

const authMW = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace('Bearer ', "");
        if (!token) {
            return res.status(401).json({ error: 'access denied: token missing' });
        }
        else {
            const verified = jwt.verify(token, secretKey);
            req.user = verified;
            next();
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default {
    createToken,
    authMW,
};