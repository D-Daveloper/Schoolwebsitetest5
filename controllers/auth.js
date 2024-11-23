import user from "../models/user.js";

// const bcrypt = require("bcrypt");
// const { sendEmail } = require("../mail/sendMail");
// const { temp } = require("../util/temp");

//register user
const register = async (req, res) => {
  // console.log(req.body)
  const username = req.body.username.toLowerCase();

  const isUserRegistered = await user.findOne({ username: username });
  // if user exists
  if (isUserRegistered) {
    // console.log(`user has been registered before!`);
    return res.json({ error: "Username is taken!" });
  }
  try {
    const User = await user.create({ ...req.body, username: username });
    console.log(User);
    const token = User.createJWT();
    res.json({ User, token });
  } catch (error) {
    console.log(error);
    res.json({ error: `error Registering user` });
  }
};
//login user
const login = async (req, res) => {
  // console.log(req.body)
  const username = req.body.username.toLowerCase();

  const User = await user.findOne({ username });
  // if user exists
  if (!User) {
    //   console.log(`user has not been registered before!`);
    return  res.render("login",{ error: "user does not exist"});

  }
  const isPasswordCorrect = await User.comparePassword(req.body.password);
  if (!isPasswordCorrect) {
    return res.render("login",{ error: "password is incorrect"});
  }
  try {
    const token = User.createJWT();
    res.cookie("token", token, { httpOnly: true, secure: true }); // Secure option for HTTPS
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.json({ error: `error Registering user` });
  }
};

export { register, login };
