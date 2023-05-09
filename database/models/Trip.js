const { Schema, model } = require("mongoose");

const TripSchema = new Schema(
    {
        user:{
            type:String,
            required:true
        },
        whereto: {
            type: String,
            required: true,
        },
        startdate: {
            type: String,
            required: true,
        },
        enddate: {
            type: String,
            required: true,
        },
        tasks:[Object]
    },
    { timestamps: true }
);

module.exports = model("Trip", TripSchema);