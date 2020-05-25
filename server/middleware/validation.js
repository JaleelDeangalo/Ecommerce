const jwt = require("jsonwebtoken");
const secret = require("../config/keys").jwtSecret;



 const auth = (req, res, next) => {

    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({Message: "No token access denied"});
    }

    try {
        
        jwt.verify(token, secret, function (error, decoded){
            if(error){
                return res.status(401).json({Message: "Token not valid"});
            }

            req.user = decoded.user;
            next();
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({Message: "Server Error"});
    }
};




const admin  = (req, res, next) => {
    if(req.profile.role === 0 ){
        return res.status(403).json({Message: "Not authorized"});
    } 
    next();
};

module.exports = {auth, admin};