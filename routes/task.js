const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
    const { title, description, dueDate, priority, status, userId } = req.body;

    // Validate required fields
    if (!title || !description || !dueDate) {
        return res.status(400).json({ message: 'Title, description, and due date are required.' });
    }

    const task = new Task({
        title,
        description,
        dueDate,
        priority,
        status,
        userId: userId || null // Allow userId to be optional
    });

    try {
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
});

// Fetch all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        //console.log('Fetched Tasks:', tasks); // Log fetched tasks
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
});


// Fetch a specific task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error });
    }
});

// Update a task by ID
router.patch('/:id', async (req, res) => {
    const updates = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
    //console.log('task.js routes delete id: req.params.id');
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
});

module.exports = router;
