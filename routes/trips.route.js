import express from "express";
import { supabase } from "../config/supabase.js";
import { createTrip, getTripsByDriver } from "../controller/trips.controller.js";
import { allowRoles } from "../middleware/middleware.js";
const router = express.Router();
router.post("/create", allowRoles(["driver"]), createTrip);
router.get("/driver/:driver_id", allowRoles(["driver"]), getTripsByDriver);
export default router;
