import express from "express";
import { supabase } from "../config/supabase.js";
import { addVehicle, getVehicles } from "../controller/vehicales.controller.js";
import { allowRoles } from "../middleware/middleware.js";   
const router = express.Router();

router.post("/add", allowRoles(["owner"]), addVehicle);
router.patch("/assign/:vehicle_id", allowRoles(["owner"]), asignDriver);
router.get("/owner/:owner_id", allowRoles(["owner"]), getVehicles);
export default router;