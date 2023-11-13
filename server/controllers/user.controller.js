import User from '../models/user.model.js';
import errorHandler from '../helpers/dbErrorHandler.js';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

// Handles user creation
const create = async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new user if the email is not in use
    const user = new User(req.body);
    await user.save();

    // Generate a token for the newly created user
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    // Set the token as a cookie
    res.cookie('t', token, { expire: new Date() + 999 });

    // Return user information and token in the response
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err); // Log the error for debugging

    return res.status(400).json({
      error: errorHandler.getErrorMessage(err) || 'Could not create user'
    });
  }
};

// Fetches a user by ID and sets it to req.profile
const getUserById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Updates user details
const update = async (req, res) => {
  try {
    let user = req.profile
    Object.assign(user, req.body);
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

// Sends user data in response
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
// Lists all users
const list = async (req, res) => {
  try {
    let userlist = await User.find().select('name email created updated')
    res.json(userlist)
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user",
    })
  }
}

// Removes a user, tested
const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await user.deleteOne()
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default { create, getUserById, update, list, read, remove };
