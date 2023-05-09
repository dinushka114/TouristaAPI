require("dotenv").config();
const User = require("../database/models/User")

const userAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(process.env.SECRET);
    if (!authHeader) return res.sendStatus(403);
    console.log(authHeader); // Bearer token
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        console.log("verifying");
        if (err) return res.sendStatus(403); //invalid token

        console.log(decoded); //for correct token
        next();
    });
};


const checkRole = (roles) => async (req, res, next) => {
    let { email } = req.body;

    //retrieve employee info from DB
    const employee = await User.findOne({ email });
    !roles.includes(user.role)
        ? res.status(401).json("Sorry you do not have access to this route")
        : next();
};

module.exports = { userAuth, checkRole }