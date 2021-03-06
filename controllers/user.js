const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const Posts = require('../models/post');

signin = async (req, res) => {
  try {
    const existUser = await Users.findOne({ username: req.body.username },
      '+passwordHash');
    if (existUser) {
      const passCorrect = await bcrypt.compare(req.body.password,
        existUser.passwordHash);
      if (passCorrect) {
        token = jwt.sign({ username: req.body.username, id: existUser.id },
          process.env.SECRET, { expiresIn: "24h" });
        const { _id, username, follows, __v } = existUser;
        res.status(200).json({ message: 'Logged in successfully', user: { _id, username, follows, __v }, token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    } else {
      res.status(400).json({ message: 'User doesn\'t exists!' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

signup = async (req, res) => {
  try {
    const existUser = await Users.findOne({ username: req.body.username });
    if (existUser) {
      res.status(403).json({ message: 'Username already exists!' });
    } else {
      const hash = await bcrypt.hash(req.body.password, 14);
      const newUser = await Users.create({
        username: req.body.username,
        passwordHash: hash
      });
      token = jwt.sign({ username: newUser.username, id: newUser.id },
        process.env.SECRET, { expiresIn: "24h" })
      const { _id, username, follows, __v } = newUser;
      res.status(201).json({ message: 'Signed up successfully!', user: { _id, username, follows, __v }, token: token });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

toggleFollow = async (req, res) => {
  try {
    if (req.username !== req.params.username) {
      return res.status(403).json({ message: 'Cannot change other users\' data' });
    }
    if (!req.body.targetUserId) {
      return res.status(400).json({ message: 'No targetUserId specified in body' });
    }
    const user = await Users.findById(req.userId);
    const currentFollow = user.follows.indexOf(req.body.targetUserId);
    if (currentFollow === -1) {
      user.follows.push(req.body.targetUserId);
    } else {
      user.follows = user.follows.filter((id) => id.toString() !== req.body.targetUserId);
    }
    const reply = await user.save();
    res.status(200).json({ data: reply });
  } catch (error) {
    res.status(400).json({ message: error.stack });
  }
}

fetchPostsByUser = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageLimit = 10;
  try {
    const user = await Users.findOne({ username: req.params.username });
    if (!user) { return res.status(404).json({ message: 'User not found.' }) }
    const totalNumberOfPosts = await Posts.where('creator').equals(user._id).countDocuments();
    const posts = await Posts.where('creator').equals(user._id).sort({ _id: 'desc' })
      .skip((page - 1) * pageLimit).limit(pageLimit);
    res.status(200).json({
      data: {
        posts: posts,
        currentPage: page,
        totalPages: Math.ceil(totalNumberOfPosts / pageLimit)
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

userProfile = async (req, res) => {
  try {
    const reply = await Users.findOne({ username: req.params.username });
    res.status(200).json({ data: reply });
  } catch (error) {
    res.status(404).json({ message: 'User does not exist!' });
  }
}

module.exports = {
  signin, signup, toggleFollow, fetchPostsByUser, userProfile
};