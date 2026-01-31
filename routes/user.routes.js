import express from "express";
import{ supabase } from "../config/supabase.js";
import { signUpUser } from "../controller/user.controller.js";  


const router = express.Router();
router.post("/signup", signUpUser);

export default router;