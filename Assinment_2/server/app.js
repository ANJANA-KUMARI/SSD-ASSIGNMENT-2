// setup env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const googleRouter = require("./routes/google.router");
const onedriveRouter = require("./routes/onedrive.router");

// init App
const app = express();

const PORT = process.env.PORT || 8000;

// setup middleware
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/google", googleRouter);
app.use("/onedrive", onedriveRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
