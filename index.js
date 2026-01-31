import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import vehicleRoutes from "./routes/vehicales.route.js";
import tripRoutes from "./routes/trips.route.js";   

dotenv.config();

const app = express();
const PORT = process.env.PORT || 30040;
app.use(express.json());

app.use("/users", userRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/trips", tripRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


