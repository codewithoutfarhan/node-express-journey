const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userschema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is totally required here"],
      unique: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, "name is required here !!!"],
    },
    password: {
      type: String,
      required: [true, "password is required here !! "],
      minlength: [6, "password must be in true format and in limit"],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userschema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});

userschema.methods.comparepassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userschema);
