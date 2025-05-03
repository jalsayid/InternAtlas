const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: './config/config.env' });

const uri = process.env.DB_URI;

const badWords = [
  'damn', 'shit', 'fuck', 'idiot', 'stupid',
  'worst', 'bad', 'trash', 'sucks', 'garbage',
  'hate', 'horrible', 'awful', 'dumb', 'fool',
  'bastard', 'moron', 'loser', 'ugly', 'useless'
];

// GET reviews by company and position
router.get('/:company/:position', async (req, res) => {
  const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
  const { company, position } = req.params;
  console.log(`Fetching reviews for company=${company}, position=${position}`);

  try {
    await client.connect();
    const db = client.db('App');
    const collection = db.collection('Review');

    const query = { company, position };
    const reviews = await collection.find(query).toArray();

    res.json(reviews);
  } catch (err) {
    console.error('Database GET error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  } finally {
    await client.close();
  }
});

// PATCH company response
router.patch('/:id/response', async (req, res) => {
  const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
  const { id } = req.params;
  const { responseText } = req.body;
  console.log(`Updating review ID=${id} with response="${responseText}"`);

  try {
    await client.connect();
    const db = client.db('App');
    const collection = db.collection('Review');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { companyResponse: responseText } }
    );

    if (result.modifiedCount === 1) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (err) {
    console.error('Database PATCH error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  } finally {
    await client.close();
  }
});

// ✅ POST new review
router.post('/', async (req, res) => {
  const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
  const { company, position, studentId, studentName, rating, reviewText } = req.body;
  console.log(`Inserting review for company=${company}, position=${position}`);

  try {
    await client.connect();
    const db = client.db('App');
    const collection = db.collection('Review');

    // ✅ Check if reviewText contains bad words
    const foundBadWord = badWords.find(word => reviewText.toLowerCase().includes(word));
    const isInappropriate = !!foundBadWord; // cleaner

    const newReview = {
      company,
      position,
      studentId,
      studentName,
      rating,
      reviewText,
      companyResponse: null,
      is_inappropriate: isInappropriate,
      reason: isInappropriate ? `Contains inappropriate word: ${foundBadWord}` : null
    };

    const result = await collection.insertOne(newReview);
    res.json({ success: true, insertedId: result.insertedId, flagged: isInappropriate });
  } catch (err) {
    console.error('Database POST error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  } finally {
    await client.close();
  }
});

module.exports = router;
