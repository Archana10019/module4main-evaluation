import { SupabaseClient } from "@supabase/supabase-js";
export const createtrips=async(req,res)=>{
    try{
        const { customer_id, driver_id, vehicle_id, start_location, end_location, } = req.body;
        const { data, vehicaless} = await supabase
            .from("vehicaless")
            .select("*")
            .eq("id", vehicle_id)
            .single();
        if (!vehicaless || !vehicaless.isavailable) {
            return res.status(400).json({ error: "Vehicle is not available." });
        }
        if(!passenger.isavailable){
            return res.status(400).json({ error: "Driver is not available." });
        }
        const { data: tripData, error } = await supabase
            .from("trips")
            .insert([{ customer_id, driver_id, vehicle_id, start_location, end_location, status: "ongoing" }])
            .select("*");   
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        // Update vehicle availability
        await supabase
            .from("vehicaless")
            .update({ isavailable: false })
            .eq("id", vehicle_id);
        res.status(201).json({ message: "Trip created successfully", tripData });
    }
    catch(error){
        res.status(500).json({ error: "Server Error" });
    }
};

export const getTripsByCustomerID=async(req,res)=>{
    try{
        const { customer_id } = req.params;
        const { data, error } = await supabase
            .from("trips")
            .select("*")
            .eq("customer_id", customer_id);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({ trips: data });
    }
    catch(error){
        res.status(500).json({ error: "Server Error" });
    }
}

export const getTripsByDriverID=async(req,res)=>{
    try{
        const { driver_id } = req.params;   
        const { data, error } = await supabase
            .from("trips")
            .select("*")
            .eq("driver_id", driver_id);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({ trips: data });
    }
    catch(error){
        res.status(500).json({ error: "Server Error" });
    }
}
export const updateTripStatus=async(req,res)=>{
    try{
        const { trip_id } = req.params;     
        const { status } = req.body;
        const { data, error } = await supabase
            .from("trips")
            .update({ status })
            .eq("id", trip_id)
            .select("*");
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({ message: "Trip status updated successfully", data });
    }
    catch(error){
        res.status(500).json({ error: "Server Error" });
    }
}
export const completeTrip=async(req,res)=>{
    try{
        const { trip_id } = req.params;
        const { data: tripData, error: tripError } = await supabase

            .from("trips")
            .select("*")
            .eq("id", trip_id)
            .single();      
        if (tripError) {
            return res.status(400).json({ error: tripError.message });
        }
        if (tripData.status !== "ongoing") {
            return res.status(400).json({ error: "Trip is not ongoing." });
        }
        const { data: vehicleData, error: vehicleError } = await supabase
            .from("vehicaless")
            .select("*")
            .eq("id", tripData.vehicle_id)
            .single();
        if (vehicleError) {
            return res.status(400).json({ error: vehicleError.message });
        }
        // Mark trip as completed
        const { data: updatedTripData, error: updateError } = await supabase
            .from("trips")
            .update({ status: "completed" })
            .eq("id", trip_id)
            .select("*");
        if (updateError) {
            return res.status(400).json({ error: updateError.message });
        }
        // Update vehicle availabilitfy
        await supabase
            .from("vehicaless")
            .update({ isavailable: true })
            .eq("id", tripData.vehicle_id);
        res.status(200).json({ message: "Trip completed successfully", updatedTripData });
    }
    catch(error){
        res.status(500).json({ error: "Server Error" });
    }
}