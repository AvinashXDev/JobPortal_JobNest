import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User nahi hai authenticated",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY); // No 'await' needed
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decoded.userId; // Assuming token contains userId
        next();
    } catch (error) {
        console.error("JWT Error:", error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false,
        });
    }
};

export default isAuthenticated;
