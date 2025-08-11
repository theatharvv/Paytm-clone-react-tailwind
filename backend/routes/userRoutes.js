const express = require("express");
const router = express.Router();
const zod = require("zod");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const updateSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().min(6, "Password must be at least 6 characters long").optional()
});

//Update User data
router.put('/', authMiddleware, async (req, res) => {

    const userId = req.userId;

    try {
        const parsed = updateSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ message: "Invalid Input", error: parsed.error.errors })

        const updateData = { ...parsed.data };

        //If there is no data to update we return error
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No valid fields to update" });
        }
        //Hashed the password
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        await User.updateOne({ _id: userId }, updateData);
        return res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Server Error" })
    }
});

// Get all users
router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    try {
        const users = await User.find({
            $or: [
                { firstName: { $regex: filter, $options: "i" } }, // <-- "i" makes it case-insensitive
                { lastName: { $regex: filter, $options: "i" } }
            ]
        });

        return res.status(200).json({
            users: users.map(user => ({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router;