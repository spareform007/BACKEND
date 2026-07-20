const User = require("../Models/user");

const createUser = async (req, res) => {
    try {
        const { name, email, mobile, password, confirmpassword } = req.body;

        if (!name || !email || !mobile || !password || !confirmpassword) {
            return res.status(400).json({
                message: "ALL FIELDS ARE REQUIRED",
            });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({
                message: "PASSWORDS DO NOT MATCH",
            });
        }
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "USER ALREADY EXISTS"
            });
        }

        const newUser = await User.create({
            name,
            email,
            mobile,
            password
        });

        res.status(201).json({
            message: "USER CREATED SUCCESSFULLY",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createUser,
};
