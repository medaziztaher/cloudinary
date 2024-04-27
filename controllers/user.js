const User = require('../models/user');
const cloudinary = require('cloudinary').v2;
const { validationResult } = require('express-validator');
const dotenv = require('dotenv')
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


module.exports.createUser = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Handle image upload
        let image;
        if (req.files['image'][0]) {
            image = await cloudinary.uploader.upload(req.files['image'][0].path);
        }
        let images = [];
        // Handle multiple image uploads
        if (req.files['images']) {
            const imagesFiles = req.files['images'].map(file => file.path);

            if (imagesFiles && imagesFiles.length > 0) {
                for (const file of imagesFiles) {
                    const uploadedImage = await cloudinary.uploader.upload(file);
                    images.push(uploadedImage.secure_url);
                }
            }

        }

        // Create new user object
        const { name } = req.body;

        const newUser = new User({
            name,
            image: image ? image.secure_url : null,
            images: images.length > 0 ? images : null
        });
        // Save user to the database
        await newUser.save();

        return res.status(200).json({ status: true, message: "User profile created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Error creating user profile" });
    }
};
