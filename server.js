require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { authenticateToken } = require('./middleware/auth'); // Adjust path as necessary
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Adjust to your frontend URL
    credentials: true,
}));
app.use(express.json());

// User routes
app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes);
// Protected routes
const protectedRoutes = express.Router();
//protectedRoutes.use(authenticateToken);
//protectedRoutes.use('/api/tasks', taskRoutes);
//app.use('/api/tasks', protectedRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
    });
