import { User } from "../models/userModel.js";
import { Validate, ValidateLogin } from '../utils/validate.js';
import { createAccessToken } from '../utils/tokens.js';
import bcrypt from 'bcryptjs';
export const getUsers = async (req, res, next)=>{
    res.send("these are available users")
}

//registering user

export const registerUser = async (req, res, next)=>{
    const { username, email, password } = req.body;
    try {
        const { error } = Validate(req.body);
        if(error) return res.json({msg: error.details[0].message});
        let user = await User.findOne({ username });
        if(user) return res.json({msg: "username has been taken"});
        user = await User.findOne({ email });
        if(user) return res.json({msg: "user already exists"});
        const salt = await bcrypt.genSalt(5);
        const securedPassword = await bcrypt.hash(password, salt);

      user = await new User({
        username,
        email,
        password: securedPassword
    }).save();

      let accesstoken = createAccessToken(user._id);
      return res.json({ accesstoken })
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
    
}

//loging in a user

export const logingUser = async (req, res, next)=>{
    const { error } = ValidateLogin(req.body);
    if(error) return res.json({msg: error.details[0].message});
    let user = await User.findOne({ email });
    if(!user) return res.json({msg: "Invalid email or password"});
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) return res.json({msg: "Invalid email or password"});
    let accesstoken = createAccessToken(user._id);
    return res.json({ accesstoken })
}

//udpating user info

export const updateUser = async (req, res, next)=>{
    res.send("This is user info update")
}

//deleting user account
export const deleteUser = async (req, res, next)=>{
    res.send("you have deleted your account");
}