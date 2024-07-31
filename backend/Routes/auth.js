const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../Models/user');
const router = express.Router();
const passport = require('passport');

const bcryptjs = require('bcryptjs');

const multer = require('multer');

router.post('/register', async function (req,res) {
    const {name, email, userName, password} = req.body;

    const hashedPassword = await bcryptjs.hash(password,10);
    const newUserData = {name, email, userName, password: hashedPassword};
    const newUser = await userModel.create(newUserData);
    const token = await getToken(email, newUser);
    const userToReturn = {...newUser.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

router.post('/login', async function (req,res) {
  const {email, password} = req.body;
  const user = await userModel.findOne({email: email});
  if(!user){
    return res.status(404).json({err: 'email already exists'});
  }

  const isPasswordValid = await bcryptjs.compare(password,user.password);
  if(!isPasswordValid){
    return res.status(404).json({err: 'incorrect password'});
  }

  const token = await getToken(email, user);
  const userToReturn = {...user.toJSON(), token};
  delete userToReturn.password;
  return res.status(200).json({userToReturn});
});

router.get('/get/mydetails', passport.authenticate('jwt', {session: false}), async function (req,res){
  const userId = req.user._id;

  const user = await userModel.findOne({_id: userId});

  if(!user){
    return res.status(404).json({err: 'not found'});
  }

  return res.status(200).json({data: user});
});

router.post('/edit/my/details', passport.authenticate('jwt', {session: false}), async function (req,res) {
  const userId = req.user._id;
  const newData = req.body;
  
  const user = await userModel.findOne({_id: userId});

  if(user){
    if (newData.name) user.name = newData.name;
    if (newData.email) user.email = newData.email;
    if (newData.userName) user.userName = newData.userName;
  await user.save();
  }

  if(!user){
    return res.status(404).json({err: 'not found'});
  }

  return res.status(200).json({data: user});

});

router.post('/change/password', passport.authenticate('jwt', {session: false}), async function (req,res) {
  const data = req.body;
  const userId = req.user._id;

  const user = await userModel.findOne({_id: userId});

  if(!user){
    return res.status(404).json({err: 'not found'});
  }

  const isOldPasswordCorrect = await bcryptjs.compare(data.oldPassword, user.password);
  if(isOldPasswordCorrect) {
    const newPassword = await bcryptjs.hash(data.newPassword,10);
    user.password=newPassword;
    await user.save();
    return res.status(200).json({data: user});
  }

  return res.status(404).json({err: 'old password is incorrect'});

});

const storage = multer.memoryStorage(); // Use memoryStorage to get the file as a buffer
const upload = multer({ storage: storage });


router.post('/edit/profile-photo', passport.authenticate('jwt', { session: false }), upload.single('profilePhoto'), async (req, res) => {
  try {
      if (!req.file) {
        console.log('file not found');
          return res.status(400).json({ message: 'No file uploaded' });
      }

      console.log(req.file);

      const user = await userModel.findOne({ _id: req.user._id });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.profilePhoto = req.file.buffer; // Save the file buffer in the user document
      await user.save();

      res.status(200).json({ user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/profile-photo', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      const user = await userModel.findOne({ _id: req.user._id });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (!user.profilePhoto) {
          return res.status(404).json({ message: 'Profile photo not found' });
      }

      res.set('Content-Type', 'image/jpeg'); // Adjust content type if needed
      res.send(user.profilePhoto);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

const jwt = require('jsonwebtoken');

const getToken = (email, user) => {
    const payload = {
      id: user._id, // Ensure the user ID is included here
      email: email,
    };
  
    return jwt.sign(payload, 'secret', { expiresIn: '30d' });
  };

  module.exports = router;
