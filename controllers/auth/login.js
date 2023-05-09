const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();
const User = require("../../database/models/User");

const userLogin = async (req, role, res) => {
    let { email, password } = req;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User  is not found. Invalid login credentials.",
            success: false,
        });
    }

    if (user.role !== role) {
        return res.status(403).json({
            message: "Please make sure you are logging in from the right portal.",
            success: false,
        });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {

        let token = jwt.sign(
            {
                role: user.role,
                name: user.name,
                email: user.email,
            },
            process.env.SECRET,
            { expiresIn: "3 days" }
        );

        let result = {
            name: user.name,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 168,
        };

        return res.status(200).json({
            ...result,
            message: "You are now logged in.",
        });
    } else {
        return res.status(403).json({
            message: "Incorrect password.",
        });
    }
}

module.exports = userLogin;