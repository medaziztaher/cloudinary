const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createUser } = require('../controllers/user');
const upload = require('../middlewares/upload');

// Route to create a new user

router.post('/addUser',
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 4 }]),
    createUser // Controller function to create a new user
);

module.exports = router;
