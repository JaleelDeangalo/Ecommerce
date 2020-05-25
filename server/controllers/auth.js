const User = require("../models/User");
const jwt = require('jsonwebtoken'); 
const bcrypt = require("bcryptjs");
const secret = require("../config/keys").jwtSecret;
const { errorHandler } = require("../error/dbErrorHandler");
const {check, validationResult} = require("express-validator");


module.exports = [
    check("name", "Name is required").notEmpty(),
    check("email", "Plese enter a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({min:6})
],
async function signup (req, res)  {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({Message: errors.array()});
    }

    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({Message: "Email in use"});
        };

        user = new User({
            name,
            email,
            password,
            role
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(salt, password);

        await user.save();

        res.json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

module.exports = [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").notEmpty()
],
async function signin (req, res)  {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({Message: errors.array()});
    }

    const { email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({Message: "User not found"});
        };

        const isMatched = await bcrypt.compare(password, user.password);

        if(!isMatched){
            return res.status(401).json({Message: "Email or passwor is invalid"});
        };

        const Payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(Payload, secret);
        res.cookie("t", token, {expire: new Data() + 9999});
        return res.status(200).json({token, user});

      
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};



  const signout = (req, res) =>  {
    res.clearCookie("t");
    res.json({ message: "Signout success" });
};

//exports.requireSignin = expressJwt({
    //secret: process.env.JWT_SECRET,
  //  userProperty: 'auth'
//});

//exports.isAuth = (req, res, next) => {
    //let user = req.profile && req.auth && req.profile._id == req.auth._id;
   // if (!user) {
        //return res.status(403).json({
        //    error: 'Access denied'
      //  });
    //}
  //  next();
//};

//exports.isAdmin = (req, res, next) => {
  //  if (req.profile.role === 0) {
    //    return res.status(403).json({
      //      error: 'Admin resourse! Access denied'
        //});
    //}
    //next();
//};

/**
 * google login full
 * https://www.udemy.com/instructor/communication/qa/7520556/detail/
 */


 module.exports = signout;
