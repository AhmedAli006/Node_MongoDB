const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
// Import routes
const userRoutes = require("./routes/user");

dotenv.config();

var port = process.env.port || 4000;

// connect to db
// mongoose.connect(
//   process.env.DB_CONNECT,
//   { useUnifiedTopology: true, useNewUrlParser: true },
//   () => console.log("connected to db")
// );
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });


// Middlewares
app.use(express.json());
app.use(cors());

// route Middlewares
app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`server up and runing on port ${port}!`));