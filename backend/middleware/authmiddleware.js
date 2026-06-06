//for postman we use the token
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization; //token received from frontend

    if (!token) { //if token is not present in the request header, return 401 Unauthorized
        return res.status(401).json({
            message: "Token Required"
        });
    }

    try { //verify the token using the secret key and decode the payload

        const decoded = jwt.verify(
            token,      //shows only in postman, not in frontend
            process.env.JWT_SECRET //secret key defined in .env file
        );

        req.user = decoded;//respose is decoded

        next(); //goes to controller 

    } catch {

        res.status(401).json({
            message: "Invalid Token" // later expire token logic is given here
        });

    }
};

module.exports = authMiddleware;    