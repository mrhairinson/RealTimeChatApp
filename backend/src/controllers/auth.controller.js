import bcrypt from "bcryptjs";
import { ERR } from "../libs/errorCode.js";
import User from "../models/user.model.js";
import { generateJwtToken, isValidEmail } from "../libs/utils.js";
import cloudinary from "../libs/cloudinary.js";

export const signup = async (req, res) => {
  let { fullName, email, password } = req.body;
  try {
    //Check not null fullname
    if (!fullName) return res.status(400).json(ERR.FULLNAME_REQUIRED);
    //Check not null email
    if (!email) return res.status(400).json(ERR.EMAIL_REQUIRED);
    //Check not null password
    if (!password) return res.status(400).json(ERR.PASSWORD_REQUIRED);
    //Validate password
    if (password.length < 6)
      return res.status(400).json(ERR.PASSWORD_LENGTH_MIN_6);
    //Validate email
    if (!isValidEmail(email)) return res.status(400).json(ERR.INVALID_EMAIL);
    //Check if email existed
    const user = await User.findOne({ email });
    if (user) return res.status(400).json(ERR.EMAIL_SIGNUP_EXISTED);
    //Hash password
    const salt = await bcrypt.genSalt(12);
    password = await bcrypt.hash(password, salt); //Password after hashed
    //Create new user
    const newUser = new User({
      fullName,
      email,
      password,
    });
    //Case invalid user
    if (!newUser) return res.status(400).json(ERR.INVALID_USER_DATA);
    //Success, Generate jwt, send success res
    generateJwtToken(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log(`Interal Server Error Signup:\n${error}`);
    res.status(500).json(ERR.INTERNAL_SERVER_ERROR);
  }
};

export const signin = async (req, res) => {
  let { email, password } = req.body;
  try {
    // Check not null email
    if (!email) return res.status(400).json(ERR.EMAIL_REQUIRED);
    // Check not null password
    if (!password) return res.status(400).json(ERR.PASSWORD_REQUIRED);
    // Validate email
    if (!isValidEmail(email)) return res.status(400).json(ERR.INVALID_EMAIL);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json(ERR.EMAIL_NOT_FOUND);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json(ERR.WRONG_PASSWORD);

    // Generate JWT token and set cookie
    generateJwtToken(user._id, res);

    // Respond with user info
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(`Interal Server Error Signin:\n${error}`);
    res.status(500).json(ERR.INTERNAL_SERVER_ERROR);
  }
};

export const signout = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({ message: "Signout successful" });
  } catch (error) {
    console.log(`Interal Server Error Signout:\n${error}`);
    res.status(500).json(ERR.INTERNAL_SERVER_ERROR);
  }
};

export const checkAuth = async(req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        console.log(`Interal Server Error Checkauth:\n${error}`);
        res.status(500).json(ERR.INTERNAL_SERVER_ERROR);
    }
}

export const updateProfile = async(req, res) => {
    try {
      console.log(JSON.stringify(req.body, null, 2))
        const {profilePic} = req.body;
        const user = req.user;
        const userId = user._id;
        if(!profilePic) return res.status(400).json(ERR.PROFILE_PIC_IS_MISSING);
        const uploadResponse = await cloudinary.uploader.upload(profilePic); //Update picture to image bucket in cloudinary

        //Update user in DB
        const updateUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})
        res.status(202).json({message: updateUser});
    } catch (error) {
        console.log(`Interal Server Error Update Profile:\n${error}`);
        res.status(500).json(ERR.INTERNAL_SERVER_ERROR);
    }
}
