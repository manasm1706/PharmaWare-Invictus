import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Ensure the correct path

// ✅ Register a new user
export const registerUser = async (req, res) => {
  try {
    console.log("Incoming registration request:", req.body);

    // ✅ Ensure all fields exist before proceeding
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log("❌ Missing fields:", { name, email, password });
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      console.log("❌ User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash the password properly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("✅ Hashed Password:", hashedPassword);

    user = new User({ name, email, password: hashedPassword });
    await user.save();
    console.log("✅ User saved to database");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, createdAt: user.createdAt },
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    console.log("🔹 Incoming login request:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found in database");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ User found:", user);

    // ✅ Check if password is hashed again before comparing
    if (password.startsWith("$2b$")) {
      console.log("❌ ERROR: Password is already hashed in the request!");
      return res.status(400).json({ message: "Invalid credentials (hashing issue)" });
    }

    // ✅ Compare entered password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔹 Plain password:", password);
    console.log("🔹 Stored hashed password:", user.password);
    console.log("✅ Password match result:", isMatch);

    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, createdAt: user.createdAt },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
