const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  const { name, phoneNo, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNo }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email or phone number.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ name, email, phoneNo, password: hashedPassword });

    return res.handler.response(
      STATUS_CODES.SUCCESS,
      STATUS_MESSAGES.LOGIN_SUCCESS,
      {
        user: newUser 
      }
    );
  } catch (err) {
    console.error('Error during signup:', err.message);
    return res.handler.response(STATUS_CODES.SERVER_ERROR, STATUS_MESSAGES.SERVER_ERROR);
  }
};
