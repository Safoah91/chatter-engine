const express = require("express");
const dotenv = require("dotenv/config");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./database");
const UserRoutes = require("./routes/users");

const app = express();
connectDB();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("welcome here");
});

app.use("/api", UserRoutes);

app.listen(port, () => {
  console.log(`- server listening on port ${port}`);
});
