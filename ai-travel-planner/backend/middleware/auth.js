// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

function auth(req, res, next){
const authHeader = req.headers.authorization || '';
const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
if (!token) return res.status(401).json({ error: 'No token provided' });


try{
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.user = { id: payload.id, email: payload.email };
next();
} catch(err){
return res.status(401).json({ error: 'Invalid token' });
}
}


export default auth;