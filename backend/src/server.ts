import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ticketRoutes from "./routes/tickets";

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "";

mongoose
	.connect(MONGO_URI, {})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("Failed to connect to MongoDB", error);
	});

// Routes
app.get("/", (req, res) => {
	res.send("Welcome to help desk support system");
});

app.use("/api/tickets", ticketRoutes);

// Start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
