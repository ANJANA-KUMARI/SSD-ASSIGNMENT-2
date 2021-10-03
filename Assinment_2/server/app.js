const express = require("express");
const cors = require("cors");
const googleRouter = require("./routes/google.router");
const onedriveRouter = require("./routes/onedrive.router");

// Init App
const app = express();

const PORT = process.env.PORT || 8000;

app.post("/", (req, res) => {
  res.send("Hello! API Running...");
});

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/google", googleRouter);
app.use("/onedrive", onedriveRouter);
