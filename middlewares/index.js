require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../database/models/User")

const userAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(403);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
        next();
    });
};


const checkRole = (roles) => async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(403);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        let email = decoded.email
        if (err) return res.sendStatus(403); //invalid token
        const user = await User.findOne({ email });
        // console.log(req)
        !roles.includes(user.role)
            ? res.status(401).json("Sorry you do not have access to this route")
            : next();
    });

    
};

module.exports = { userAuth, checkRole }