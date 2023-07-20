const User = require("../model/Users");

// Get All users
const user_all = async (req, res) => {
    try {
        const users = await user.find();
        res.json(users);
      } catch (error) {
        res.json({ message: error });
      }
};

// Single user
const user_details = async (req, res) => {
    try {
        const user = await user.findById(req.params.userId);
        res.json(user);
      } catch (error) {
        res.json({ message: error });
      }
};

// Add New user
const user_create = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
    
      try {
        const saveduser = await user.save();
        res.send(saveduser);
      } catch (error) {
        res.status(400).send(error);
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
    
        const updateduser = await user.findByIdAndUpdate(
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
        const removeuser = await user.findByIdAndDelete(req.params.userId);
        res.json(removeuser);
      } catch (error) {
        res.json({ message: error });
      }
};

module.exports = {
    user_all, 
    user_details, 
    user_create, 
    user_update, 
    user_delete
  }