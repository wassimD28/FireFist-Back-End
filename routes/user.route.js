const express = require('express');
const { User } = require('../models');

const router = express.Router();

// create user
router.post('/', async (req, res)=>{
    try{
        const user = await User.create(req.body)
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({message: error.message});
    }
})

// get all users
router.get('/' , async (req, res)=>{
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


module.exports = router;