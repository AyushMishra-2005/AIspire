import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import createTokenAndSaveCookie from '../jwt/generateToken.js'

export const signup = async (req, res) => {
  try{
    const { username, name, email, password, confirmpassword, profilePicURL } = req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ message: "User already exists with this email or username" });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User ({
      username,
      name,
      email,
      password : hash,
      profilePicURL,
    });

    await newUser.save().then(() => {
      console.log("User saved successfully!");
    });

    if(newUser){
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User registered successfully.",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          username: newUser.username,
          profilePicURL: newUser.profilePicURL,
        }
      });
    }

  }catch(err){
    console.log("Error in signup : ", err);
    res.status(500).json({ message: "Server error" });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.active) {
      return res.status(404).json({ message: "Account deleted! Can not login!" });
    }

    const compPass = await bcrypt.compare(password, user.password);

    if (!compPass) {
      return res.status(404).json({ message: "Wrong password" });
    }

    createTokenAndSaveCookie(user._id, res);

    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        profilePicURL: user.profilePicURL
      }
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
}




























