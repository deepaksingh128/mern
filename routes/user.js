const express = require('express');
const jwt = require('jsonwebtoken');

const { User, Course } = require('../db');
const authenticateUser = require('../middlewares/user');
const router = express.Router();


router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await User.create({
            username: username,
            password: password
        });
        res.json({msg: "User created successfully"});
    } catch (error) {
        res.json({msg: "Error in creating user"});
    }
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = User.findOne({
        username: username,
        password: password
    });

    if (user) {
        const token = jwt.sign(
            {username: username}, 
            process.env.JWT_SECRET
        );
        res.json({
            token: token
        });
    } else {
        res.json({
            msg: "Wrong username or password"
        });
    }
});

router.get('/courses', authenticateUser, async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json({courses: courses});
    } catch (error) {
        res.json({msg: "Error in fetching courses"});
    }
})

router.post('/courses/:courseId', authenticateUser,  async (req, res) => {
    const username = req.username;
    const courseId = req.params.courseId;

    try {
        await User.updateOne({
            username: username,
        }, {
            "$push": {
                purchasedCourses: courseId
            }
        });
        res.json({msg: "Purchased successfuly"});
    } catch (error) {
        res.json({msg: "Error in purchasing course"});
    }
});


router.get('/purchasedCourses',authenticateUser, async (req, res) => {

    try {
        const user = await User.findOne({
            username: req.username,
        });
        const courses = await Course.find({
            _id: {
                "$in": user.purchasedCourses
            }
        });
        res.json({courses: courses});
    } catch (error) {
        console.log ("error in fetching purchased courses");
    }
})

module.exports = router;