const Trip = require("../../database/models/Trip");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const planTrip = async (req, res) => {
    try {
        const { user, where, start, end, tasks } = req.body;

        const newTripPlan = new Trip({
            user,
            whereto: where,
            startdate: start,
            enddate: end,
            tasks: tasks
        })


        await newTripPlan.save();
        return res.status(201).json({
            message: "You planned a new trip.."
        });
    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        });
    }

}

const getMyTrips = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET,async (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            let user = decoded.email;

            const myTrips = await Trip.find({ user });
            return res.status(200).json(myTrips);
      
        });

     

    } catch (err){
        return res.status(500).json({
            message: `${err.message}`
        });
    }
}

module.exports = { planTrip, getMyTrips };