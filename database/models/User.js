const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        mobileNo: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default:'Admin',
            enum: ["Admin", "User"],
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = model("User", EmployeeSchema);