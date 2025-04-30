const express = require('express');
const router = express.Router();
const client = require('../config/db');

// GET all internships
router.get('/', async (req, res) => {
  try {
    await client.connect();
    const data = await client.db('App').collection('InternshipOpportunitiesData').find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching internship opportunities');
  } finally {
    await client.close();
  }
});

// POST new internship
router.post('/', async (req, res) => {
  try {
    await client.connect();
    const result = await client.db('App').collection('InternshipOpportunitiesData').insertOne(req.body);
    res.status(201).json({ message: 'Posted!', internshipId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error posting internship');
  } finally {
    await client.close();
  }
});

// DELETE internship by ID
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await client.connect();
    const result = await client.db('App').collection('InternshipOpportunitiesData').deleteOne({ _id: id });
    res.json(result.deletedCount === 1 ? { message: 'Deleted' } : { message: 'Not found' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Delete error');
  } finally {
    await client.close();
  }
});

module.exports = router;
