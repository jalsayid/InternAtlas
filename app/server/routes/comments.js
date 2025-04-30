const express = require('express');
const { ObjectId } = require('mongodb');
const client = require('../config/db');

const router = express.Router();

// GET /api/inappropriateComments
router.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('App');
    const collection = db.collection('Review');
    const data = await collection.find({ is_inappropriate: true }).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching inappropriate comments');
  } finally {
    await client.close();
  }
});

// DELETE /api/inappropriateComments/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await client.connect();
    const db = client.db('App');
    const collection = db.collection('Review');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (err) {
    console.error('Delete comment error:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

module.exports = router;
