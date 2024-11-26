// src/middleware.js
const { admin } = require('./firebase');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).send('Unauthorized');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach user info to the request
    next();
  } catch (error) {
    return res.status(403).send('Unauthorized');
  }
};

module.exports = { verifyToken };