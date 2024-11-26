// src/routes.js
const express = require('express');
const { db } = require('./firebase');
const { verifyToken } = require('./middleware');

const router = express.Router();

// User Registration & Login should be handled on the client-side with Firebase Auth
// We will assume users are already authenticated using Firebase Auth

// Create a new task
router.post('/tasks', verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.uid; // Get the authenticated user's UID

  try {
    const newTask = {
      title,
      description,
      userId,
      createdAt: new Date(),
    };

    const taskRef = await db.collection('tasks').add(newTask);
    res.status(201).json({ id: taskRef.id, ...newTask });
  } catch (error) {
    res.status(500).send('Error creating task');
  }
});

// Get all tasks for the authenticated user
router.get('/tasks', verifyToken, async (req, res) => {
  const userId = req.user.uid;

  try {
    const tasksSnapshot = await db.collection('tasks').where('userId', '==', userId).get();
    const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send('Error retrieving tasks');
  }
});

// Update a task
router.put('/tasks/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const userId = req.user.uid;

  try {
    const taskRef = db.collection('tasks').doc(id);
    const task = await taskRef.get();

    if (!task.exists || task.data().userId !== userId) {
      return res.status(404).send('Task not found or unauthorized');
    }

    await taskRef.update({ title, description });
    res.status(200).send(' Task updated successfully');
  } catch (error) {
    res.status(500).send('Error updating task');
  }
});

// Delete a task
router.delete('/tasks/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.uid;

  try {
    const taskRef = db.collection('tasks').doc(id);
    const task = await taskRef.get();

    if (!task.exists || task.data().userId !== userId) {
      return res.status(404).send('Task not found or unauthorized');
    }

    await taskRef.delete();
    res.status(200).send('Task deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting task');
  }
});

module.exports = router;