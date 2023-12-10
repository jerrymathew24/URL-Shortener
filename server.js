const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
const urlRoutes = require('./routes/urlRoutes.js');

dotenv.config();

const app = express();

// Enable CORS middleware
app.use(cors());
const PORT = process.env.PORT || 5000;
// Body parsing middleware for JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use('/auth', authRoutes);
app.use('/url', urlRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
