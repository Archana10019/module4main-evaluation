export const allowRoles = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.role; 
        if (!roles.includes(userRole)) {
            return res.status(403).json({ error: "Access denied. Insufficient permissions." });
        }   
        next();
    };
};