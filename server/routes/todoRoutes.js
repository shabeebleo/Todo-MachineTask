const express = require('express');
const Todo = require('../models/todo');

const router = express.Router();

// Fetch Todos from MongoDB
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add Todo to MongoDB
router.post('/todos', async (req, res) => {
  const { title, completed } = req.body;
  const newTodo = new Todo({ title, completed });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Todo in MongoDB
router.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Todo from MongoDB
router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
console.log(id,"id to delete");
  try {
    await Todo.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
