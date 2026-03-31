const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Simple login/register (for demo)
exports.login = async (req, res) => {
  try {
    const { name, role } = req.body;

    let user = await User.findOne({ name });

    if (!user) {
      user = await User.create({ name, role });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};