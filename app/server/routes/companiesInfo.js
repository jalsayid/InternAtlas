const express = require('express');
const router = express.Router();
const client = require('../config/db');

// GET all companies data
router.get('/', async (req, res) => {
  try {
    await client.connect();
    const data = await client.db('App').collection('CompanyData').find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching company data');
  } finally {
    await client.close();
  }
});


module.exports = router;
