import User from "../model/User.js"
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const register = async (req,res,next) =>
{
    try{
        
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

       const newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: hash,
       })

       await newUser.save()
       res.status(200).send("User created")

    }catch(err){
    next(err)
}
}


export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return next(createError(404, "User not found!"));
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password or username!"));
        }

        const token = jwt.sign({
        id:user._id,isAdmin: user.isAdmin
        }, 
        process.env.JWT)

        const { password: omitPassword, isAdmin, ...otherDetails } = user.toObject(); // Convert Mongoose document to plain JavaScript object
        res.cookie(
        "access_token",token,
        {
            httpOnly: true,
        }).status(200).json(otherDetails); // Send only otherDetails in the response
    } catch (error) {
        console.error("Error in loginUser:", error);
        next(error); // error handling middleware
    }
};