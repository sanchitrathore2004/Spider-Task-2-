const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../Models/user');
const router = express.Router();
const passport = require('passport');

const bcryptjs = require('bcryptjs');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



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

router.post('/upload/profile/photo', passport.authenticate('jwt', { session: false }), upload.single('profilePhoto'), async function (req, res) {
  try {
    console.log('File:', req.file); // Log file info

    const userId = req.user._id;
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }

    if (!req.file) {
      return res.status(400).json({ err: 'No file uploaded' });
    }

    // Set the profile photo as a buffer
    user.profilePhoto = req.file.buffer;
    await user.save();

    res.status(200).json({ message: 'Profile photo updated successfully', user });
  } catch (error) {
    console.error('Error uploading profile photo:', error);
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
