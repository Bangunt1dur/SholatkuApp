const checkRole = (...roles) => {

    return (req, res, next) => {
        
        console.log("Role user:", req.user.account_type);
        const userRole = req.user.account_type;

        if (!roles.includes(userRole)) {

            return res.status(403).json({
                message: "Akses ditolak"
            });

        }

        next();

    };

};

module.exports = checkRole;