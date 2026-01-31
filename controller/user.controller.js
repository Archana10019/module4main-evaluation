import { supabase } from "../config/supabase";

export const signUpUser = async(req ,res) =>{
    try{
        const { email, password,role } = req.body;
        if(!["customer","owner","driver"].includes(role)){
            return res.status(400).json({ error: "Invalid role specified." });
    }

    const { data, error } = await supabase
        .from("users")
        .insert([{ email, password, role }]);

    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.status(201).json({ message: "User created successfully", data });
    }catch(error){
        res.status(500).json({ error: "Server Error" });
    }
};