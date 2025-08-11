const express = require("express");
const router = express.Router();
const Account = require("../models/Account");
const User = require("../models/User")
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

//API to fetch the user's balance
router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        const sortedTransactions = account.transactions
            .sort((a, b) => b.date - a.date)
            .slice(0, 10);

        const name = req.name;
        const userId = req.userId;
        
        return res.status(200).json({
            name: name,
            userId: userId,
            email: account.email,
            balance: account.balance,
            credit: account.credit,
            debit: account.debit,
            transactions: sortedTransactions
        });

    } catch (error) {

        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

//API to transfer money
router.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;
    let session;

    // Validate transfer request
    if (amount <= 0) {
        return res.status(400).json({ message: "Amount must be greater than 0" });
    }
    if (req.userId.toString() === to.toString()) {
        return res.status(400).json({ message: "Cannot transfer to yourself" });
    }

    try {
        session = await mongoose.startSession();
        session.startTransaction();

        // Fetch sender account
        const senderAccount = await Account.findOne({ userId: req.userId }).session(session);
        if (!senderAccount || senderAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Fetch receiver account
        const receiverAccount = await Account.findOne({ userId: to }).session(session);
        if (!receiverAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid Account" });
        }

        // Transaction records
        const newSenderTransaction = {
            user: to,
            username: receiverAccount.email,
            moneySent: amount,
            type: 'debit',
            date: new Date()
        };
        const newReceiverTransaction = {
            user: req.userId,
            username: senderAccount.email,
            moneySent: amount,
            type: 'credit',
            date: new Date()
        };

        // Update sender
        await Account.updateOne(
            { userId: req.userId },
            {
                $inc: { balance: -amount, debit: amount },
                $push: { transactions: newSenderTransaction }
            }
        ).session(session);

        // Update receiver
        await Account.updateOne(
            { userId: to },
            {
                $inc: { balance: amount, credit: amount },
                $push: { transactions: newReceiverTransaction }
            }
        ).session(session);

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ message: "Transfer successful" });

    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});


module.exports = router;