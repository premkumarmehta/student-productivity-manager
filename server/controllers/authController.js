const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==============================
// GENERATE JWT TOKEN
// ==============================
const generateToken = (id, email) => {
  return jwt.sign(
    { id, email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ==============================
// REGISTER USER
// ==============================
exports.registerUser = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, password } = req.body;

    // Check existing user
    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// LOGIN USER
// ==============================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,

        token: generateToken(
          user._id,
          user.email
        ),
      });

    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};