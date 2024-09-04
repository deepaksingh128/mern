const express = require('express');
const authenticateAdmin = require('../middlewares/admin');
const jwt = require('jsonwebtoken');

const { Admin, Course } = require('../db');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    

    try {
        const admin = await Admin.create({
            username: username,
            password: password
        });
        
        if (admin) {
            res.json({msg: "Admin created successfully"});
        }
    } catch(err) {
        res.json({
            msg: "Error in creating Admin",
            error: err
        });
    }
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = Admin.findOne({
        username: username,
        password: password
    });
    if (user) {
        const token = jwt.sign({username: username}, process.env.JWT_SECRET);
        res.json({
            token: token
        });
    } else {
        res.json({
            msg: "Incorrect email or password"
        });
    }
});


router.post('/courses', authenticateAdmin, async (req, res) => {
    const title = req.body.title;
    const desciption = req.body.desciption;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    try {
        const newCourse = await Course.create({
            title: title,
            description: desciption,
            imageLink: imageLink,
            price: price
        });

        res.json({
            msg : "Course created successfully",
            courseId: newCourse._id
        });
    } catch (error) {
        res.json({msg: "Error in creating Course"});
    }
});

router.get('/courses', authenticateAdmin, async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json({
            courses: courses
        });
    } catch (error) {
        res.json({msg: "Error in fetching courses"});
    }
})

module.exports = router;