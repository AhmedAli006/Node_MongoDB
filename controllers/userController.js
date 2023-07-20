const User = require("../model/Users");

const bcrypt = require("bcryptjs");

// Get All users
const user_all = async (req, res) => {
    try {
        const users = await User.find();
    //     const emails = users.map((user) => user.email);
    // res.json(emails);
        res.json(users);
      } catch (error) {
        res.json({ message: error });
      }
};

// Single user
const user_details = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
      } catch (error) {
        res.json({ message: error });
      }
};

// Add New user


const user_signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ message: "This Email is Already Exist" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    
    return res.json(savedUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};




// Update user
const user_update = async (req, res) => {
    try {
        const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
    
        const updateduser = await User.findByIdAndUpdate(
          { _id: req.params.userId },
          user
        );
        res.json(updateduser);
      } catch (error) {
        res.json({ message: error });
      }
};

// Delete user
const user_delete = async (req, res) => {
    try {
        const removeuser = await User.findByIdAndDelete(req.params.userId);
        res.json(removeuser);
      } catch (error) {
        res.json({ message: error });
      }
};
    // user_login, 

module.exports = {
    user_all, 
    user_signup, 
    user_update, 
    user_delete,
    user_details
  }