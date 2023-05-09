const Trip = require("../../database/models/Trip");

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

module.exports = planTrip;