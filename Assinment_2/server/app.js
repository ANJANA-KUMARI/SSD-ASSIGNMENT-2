const express = require('express');
const googlePhotoSelectRouter = require('./routes/google-photos-select');
const cors = require('cors');

// Init App
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello! API Running...');
});

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Apply Routes
app.use('/google', googlePhotoSelectRouter);
