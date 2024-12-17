const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const menuRoutes = require('./routes/menuRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as per your needs
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// MongoDB Connection
mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/menu', menuRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
