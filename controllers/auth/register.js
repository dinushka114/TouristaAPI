const bcrypt = require('bcrypt');
const User = require("../../database/models/User");

const userSignUp = async (req, role, res) => {
    try {

        let avatar = "http://localhost:3001/uploads/";

        if (req.file) {
            avatar += req.file.originalname;
        } else {
            avatar = "http://i.pravatar.cc/500?img=8";

        }

        const validateEmail = async (email) => {
            let user = await User.findOne({ email });
            return user ? false : true;
        };

        const validatePhone = async (mobileNo) => {
            let user = await User.findOne({ mobileNo });
            return user ? false : true;
        };

        let emailNotRegistered = await validateEmail(req.body.email);
        if (!emailNotRegistered) {
            return res.status(400).json({
                message: `Email is already registered.`,
            });
        }

        let mobileNoNotRegistered = await validatePhone(req.body.mobileNo);
        if (!mobileNoNotRegistered) {
            return res.status(400).json({
                message: `Mobile no is already registered.`,
            });
        }

        const password = await bcrypt.hash(req.body.password, 12)

        const newUser = new User({
            name: req.body.name,
            avatar,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            role,
            password
        })

        await newUser.save();
        return res.status(201).json({
            message: "Hurry! now you are successfully registred. Please nor login."
        });


    } catch (err) {
        // Implement logger function if any
        return res.status(500).json({
            message: `${err.message}`
        });
    }
}

module.exports = {userSignUp}