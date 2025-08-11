const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const User = require("../models/User");
const Account = require("../models/Account");

const router = express.Router();

const signupSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.email(),
    password: zod.string().min(6, "Password must be at least 6 characters long")
});

const loginSchema = zod.object({
    email: zod.email(),
    password: zod.string().min(6, "Password must be at least 6 characters long")
});

//User Login API
router.post("/login", async (req, res) => {

    let email = req.body.email;
    email = email.toLowerCase().trim();
    const password = req.body.password;

    try {
        const parsed = loginSchema.safeParse({ email, password });
        if (!parsed.success) return res.status(400).json({ message: "Invalid Input", error: parsed.error.errors });

        let user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id, name: user.firstName }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            token,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

})

//User Sign-up API
router.post("/signup", async (req, res) => {
    try {
        const parsed = signupSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ message: "Invalid input", error: parsed.error.errors });
        }

        const { firstName, lastName, email, password } = parsed.data;
        const Loweremail = email.toLowerCase().trim();

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        const dummyBalance = Math.floor(Math.random() * 10000) + 1;

        await Account.create({
            userId: user._id,
            email: Loweremail,
            balance: dummyBalance,
            credit: dummyBalance,
            debit: 0,
            transactions: []
        });

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Signup Error →", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = router;