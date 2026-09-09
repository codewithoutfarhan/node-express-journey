const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function userregistercontroller(request, response) {
  try {
    const { name, email, password } = request.body;

    const isExist = await usermodel.findOne({
      email: email,
    });
    if (isExist) {
      return response.status(422).json({
        message: "email already exists",
      });
    }

    const newUser = await usermodel.create({ name, email, password });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" },
    );

    response.cookie("token", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 din milliseconds mein
    });

    response.status(201).json({
      message: "cookie is holding the token",
      userId: newUser._id,
    });

    // response.send(newUser);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "something went wrong" });
  }
}
async function userloginhere(request, response) {
  try {
    const { email, password } = request.body;

    const user = await usermodel.findOne({ email }).select("+password");
    if (!user) {
      return response.status(404).json({
        message: "user credentials are wrong write apropriate email which exists !!"
      });
    }

    const isvalidpassword = await user.comparepassword(password);
    if (!isvalidpassword) {
      return response.status(404).json({
        message: "user credentials are wrong write apropriate email which exists !!"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    response.cookie("token", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    response.status(200).json({
      message: "login successful",
      userId: user._id
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "something went wrong" });
  }
}


module.exports = { userregistercontroller, userloginhere };
