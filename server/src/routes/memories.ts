
// server/src/routes/memories.ts
import express from 'express';
import Memory from '../models/Memory';

const router = express.Router();

// Get all memories
router.get('/', async (req, res) => {
  try {
    const memories = await Memory.find().sort({ createdAt: -1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching memories', error });
  }
});

// Get single memory
router.get('/:id', async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }
    res.json(memory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching memory', error });
  }
});

// Create new memory
router.post('/', async (req, res) => {
  try {
    const { title, date, imageUrl, story, type, tilt, mood, waterIntake, sleep, energy, gratitude } = req.body;

    const newMemory = new Memory({
      title,
      date,
      imageUrl,
      story,
      type,
      tilt,
      mood,
      waterIntake,
      sleep,
      energy,
      gratitude
    });

    const savedMemory = await newMemory.save();
    res.status(201).json(savedMemory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating memory', error });
  }
});

// Update memory
router.put('/:id', async (req, res) => {
  try {
    const updatedMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMemory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    res.json(updatedMemory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating memory', error });
  }
});

// Delete memory
router.delete('/:id', async (req, res) => {
  try {
    const deletedMemory = await Memory.findByIdAndDelete(req.params.id);

    if (!deletedMemory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    res.json({ message: 'Memory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting memory', error });
  }
});

export default router;