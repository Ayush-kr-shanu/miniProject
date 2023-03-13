const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');

const authMiddleware = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
      res.status(401).send({"msg": "login again"})
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decodedToken;

    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Not found' });
    }

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
    
  }
};

module.exports = {authMiddleware}