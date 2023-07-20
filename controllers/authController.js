const bcrypt = require("bcryptjs");
const User = require("../model/Users")
const { sendResponse } = require("../helper/helper");
const jwt = require("jsonwebtoken");

const AuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const obj = { email, password };
    console.log(obj);
  
    let result = await User.findOne({ email });
    if (result) {
      let isConfirm = await bcrypt.compare(obj.password, result.password);
      if (isConfirm) {
        let token = jwt.sign({ ...result }, process.env.SECURE_KEY, {
          expiresIn: "24h",
        });
       
       res.status(403).json({ message: "Login Successfully" , token});

        
      } else {
     res.status(403).json({ message: "Credential Error" });

      }
    } else {
      
       res.status(403).json({ message: "User Doesn't Exist" });

    }
  },
  getUsers: async (req, res) => {
    User
      .find()
      .then((result) => {
        res.send(sendResponse(true, result));
      })
      .catch((err) => {});
  },
  protected: async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, process.env.SECURE_KEY, (err, decoded) => {
        if (err) {
      res.status(403).json({ message: "Unauthorized" });

        } else {
          console.log(decoded);
          next();
        }
      });
    } else {
       res.status(403).json({ message: "Unauthorized" });
      
    }
  },
  adminProtected: async (req, res, next) => {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    jwt.verify(token, process.env.SECURE_KEY, (err, decoded) => {
      if (err) {
               res.status(403).json({ message: "Unauthorized" });

      } else {
        if (decoded._doc.isAdmin) {
          next();
        } else {
       res.status(403).json({ message: "You Have Rights for this Action" });

        }
      }
    });
  },
};
module.exports = AuthController;