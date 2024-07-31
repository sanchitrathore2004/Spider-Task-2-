const express = require('express');
const mongoose = require('mongoose');
const bookModel = require('../Models/books');
const router = express.Router();
const passport = require('passport');
const userModel = require('../Models/user');

router.post('/create', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const userId = req.user._id;

    const {title, author, description, genre, coverImage} = req.body;

    const newBookData = {title, author, description, genre, coverImage: coverImage, owner: userId};

    console.log(newBookData);

    const book = await bookModel.create(newBookData);

    if(!book){
        return res.status(404).json({err: 'error'});
    }

    return res.status(200).json({data: book});
});

router.get('/getbooks', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const books = await bookModel.find();

    return res.status(200).json({data: books});
});

router.get('/get/mybooks', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const userId = req.user._id;

    const books = await bookModel.find({owner: userId})

    return res.status(200).json({data: books});
});

router.get('/save/:Id', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const bookId = req.params.Id;
    const userId = req.user._id;

    const user = await userModel.findOne({_id: userId});

    if(!user){
        return res.status(404).json({err: 'not found '});
    }

    user.saved.push(bookId);
    await user.save();

    return res.status(200).json({data: user});
});

router.get('/save/api/:Id', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const bookId = req.params.Id;
    const userId = req.user._id;

    const user = await userModel.findOne({_id: userId});

    if(!user){
        return res.status(404).json({err: 'not found '});
    }

    user.savedApi.push(bookId);
    await user.save();

    return res.status(200).json({data: user});
});

router.get('/get/savedbooks', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const userId = req.user._id;

    const user = await userModel.findOne({_id: userId}).populate("saved");

    if(!user){
        return res.status(404).json({err: 'not found'});
    }
    let apiArray=[];

   const promises = user.savedApi.map(async (id) => {
    const responseFromAPI = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
    const APIData = await responseFromAPI.json();
    console.log(APIData);
    apiArray.push(APIData);
});

await Promise.all(promises);

    return res.status(200).json({data: user, dataAPI: apiArray});
    
});

router.get('/search/:key', passport.authenticate('jwt', {session: false}), async function (req,res) {

    const searchText = req.params.key;
    const books = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchText}`);

    const data = await books.json(); // Parse the response as JSON
    console.log(data);

    return res.status(200).json({data});

});

router.get('/remove/:id/:source', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const bookId = req.params.id;
    const bookSource = req.params.source;

    console.log(bookSource);

    if(bookSource=='API'){
        const user = await userModel.findOne({_id: req.user._id});
        user.savedApi.remove(bookId);
        await user.save();
        return res.status(200).json({user});
    }
    else if(bookSource=='DB'){
        const user = await userModel.findOne({_id: req.user._id});
        user.saved.remove(bookId);
        await user.save();
        return res.status(200).json({user});
    }
});

router.get('/add/to/purchase/:id/:type', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const bookId = req.params.id;
    const userId = req.user._id;
    const bookType = req.params.type;

    const user = await userModel.findOne({_id: userId});

    if(!user){
        return res.status(404).json({err: 'not found'});
    }

    if(bookType=='DB'){
    user.purchases.push(bookId);
    await user.save();
}
else if(bookType=='API'){
    user.purchasesApi.push(bookId);
    await user.save();
}

    return res.status(200).json({data: user});
});

router.get('/get/purchased/books', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const userId = req.user._id;

    const user = await userModel.findOne({_id: userId}).populate("purchases");

    if(!user){
        return res.status(404).json({err: 'not found'});
    }
    let apiArray=[];

   const promises = user.purchasesApi.map(async (id) => {
    const responseFromAPI = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
    const APIData = await responseFromAPI.json();
    console.log(APIData);
    apiArray.push(APIData);
});

await Promise.all(promises);

    return res.status(200).json({data: user, dataAPI: apiArray});
});

module.exports = router;