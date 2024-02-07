const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const isAuthenticated = require("../middlewares/isAuthenticated");


// Registration 
const register = asyncHandler(async (req, res) => {

        const {username, email, password} = req.body 
        //validate
        if(!username || !email || !password){
            res.status(400)
            throw new Error("All fields are required")
        }
        //check the email is taken
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400)
            throw new Error("User already exists");
        }
        //hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create the user
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });
        //add the date the trial will end 
        newUser.trialExpires = new Date(
            new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
        );

        //save the user
        await newUser.save();


        res.json({
            status: true,
            message: "Registration was Successful",
            user: {
                username,
                email,
            }
        });
    
})

//Login
const login = asyncHandler(async(req, res)=>{
    const {email, password}  = req.body
    //check for user email
    const user = await User.findOne({email})
    if(!user){
        res.status(401)
        throw new Error("Invalid login credentials")
    }
    //check if password is valid
    const isMatch = await bcrypt.compare(password, user?.password);
    if(!isMatch){
        throw new Error("Invalid login credentials")
    }
    //generate token using jwt
    const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET,{
        expiresIn: '3d' //token expires in 3 days
    })
    console.log(token);
    //set the token into cookie(http only)
    res.cookie('token', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 24*60*60*1000, //1 day
    })
    //send the response
    res.json({
        status: "success",
        _id: user?._id,
        message: "Login Successful",
        username: user?.username,
        email: user?.email,
    })
})

//Logout
const logout = asyncHandler(async(req, res)=>{
    res.cookie("token", "", {maxAge: 1})
    res.status(200).json({message: "Logged out successfully"})
})
//Profile
const userProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req?.user?.id).select("-password").populate("payments").populate("ContentHistory");
    if(user){
        res.status(200).json({
            status: "success",
            user,
        })
    }else{
        res.status(404);
        throw new Error("User not found");
    }
})

//check user auth status
const checkAuth = asyncHandler(async(req, res)=>{
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    if(decoded){
        res.json({
            isAuthenticated: true,
        });
    }else{
        res.json({
            isAuthenticated: false,
        });
    }
})


module.exports = {
    register,
    login,
    logout,
    userProfile,
    checkAuth,
}