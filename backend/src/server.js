const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/shadowknight', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const authRoutes = require('./userAuth');
const adminRoutes = require('./adminPanel');
const serverRoutes = require('./serverCreation');

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/servers', serverRoutes);

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});