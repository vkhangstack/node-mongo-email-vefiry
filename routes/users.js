const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const sendEmail = require('../utils/email');
const { User, validate } = require('../models/user');
const Token = require('../models/token');

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists');

    user = await new User({
      name: req.body.name,
      email: req.body.email,
    }).save();
    let token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save();
    const message = `${process.env.BASE_URL}/users/verify/${user._id}/${token.token}`;
    await sendEmail(user.email, 'Verify email, please!', message);
    res.send('Email send to your account please  verify');
  } catch (error) {
    res.status(400).send('An error occurred: ' + error.message);
  }
});
router.get('/verify/:id/:token', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send('Invalid link');
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send('Invalid token');

    await User.findByIdAndUpdate({ _id: user._id, verified: true });
    await Token.findByIdAndRemove(token._id);
    res.send('Email verify successfully');
  } catch (error) {
    res.status(400).send('An error occurred: ' + error.message);
  }
});

module.exports = router;
