import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
  });

  userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  userSchema.methods.createJWT = function () {
    return jwt.sign(
      {
        userId: this._id,
        username: this.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
  };
  
  userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  };
  
  const user = mongoose.model('User', userSchema);
  export default user;