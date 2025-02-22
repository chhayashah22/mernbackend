import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization Header:", req.headers['authorization']);
 
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const token = authHeader.split(' ')[1];         
        console.log("result",token)                                           // Extract token after "Bearer "
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Extracted User Data:", verified); // ✅ Debugging step


        
        req.user = verified;   
        // return res.status(200).json({message:'user verified'}) ;                       // Attach user data to request object
        next();                                        // Proceed to next middleware/controller
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};
