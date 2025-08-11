require('dotenv').config()

const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes")

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3000;
connectDB();

app.use("/api/v1/user", mainRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/account", transactionRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
});