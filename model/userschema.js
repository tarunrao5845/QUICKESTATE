require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  tokens: [
    {
      token: {
        type: String,
      }, 
    },
  ],
});
userSchema.methods.generateAuthToken = async function () {
    try {
        console.log(this._id)
      const token = jwt.sign(
        { _id: this._id},
        process.env.SECRET_KEY
      );
      this.tokens = this.tokens.concat({token :token});
      await this.save();
      return token;
    } catch (err) {
      console.log(err);
    }
  };

  
userSchema.pre("save", async function (next) {
  console.log("password hasshing");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
