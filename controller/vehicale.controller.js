import { supabase } from "../config/supabase.js";

export const addvehicale = async (req, res) => {
    try {
        const { vehicale_number, vehicale_type, allowed_passenger, rate_per_km, owner_id } = req.body;
        const { data, error } = await supabase
            .from("vehicaless")
            .insert([{ vehicale_number, vehicale_type, allowed_passenger, rate_per_km, owner_id ,isavailable:true , billable:0}])
            .select("*");

            if(error){
                res.status(400).json({ error: error.message });
            }
        res.status(201).json({ message: "Vehicale added successfully", data });
    }catch (error) {
        res.status(500).json({ error: "Server Error" });
    }   
};
export const asignDriver     = async (req, res) => {
    try {
        const { vehicale_id} = req.params;
        const { driver_id } = req.body;
        const { data, error } = await supabase
            .from("vehicaless")
            .update({ driver_id })
            .eq("id", vehicale_id)
            .select("*");

        if(error){
            res.status(400).json({ error: error.message });
        }
        res.status(200).json({ message: "Driver assigned successfully", data });
    }catch (error) {
        res.status(500).json({ error: "Server Error" });
    }   
};

//get all
export const getVehicalesByID = async (req, res) => {
    try {
        const { owner_id } = req.params;
        const { data, error } = await supabase
            .from("vehicaless")
            .select("*")
            .eq("owner_id", owner_id)
            .single();
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }

}