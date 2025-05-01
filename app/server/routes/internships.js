const express = require('express');
const router = express.Router();
const client = require('../config/db');

// GET all internships
// this route is used to fetch Opportunities data with logos from CompanyData
router.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('App');

    const internships = await db.collection('InternshipOpportunitiesData').find({}).toArray();
    const companies = await db.collection('CompanyData').find({}).toArray();

    // Create a map: companyName (lowercased) → logo
    const logoMap = {};
    companies.forEach(c => {
      if (c.companyName && c.logo) {
        logoMap[c.companyName.toLowerCase()] = c.logo;
      }
    });

    // Add logo to each internship by matching "company" field
    const internshipsWithLogos = internships.map(internship => {
      const logo = logoMap[internship.company?.toLowerCase()] || '';
      return { ...internship, logo };
    });

    res.json(internshipsWithLogos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching internship opportunities');
  } finally {
    await client.close();
  }
});

// Get internship by ID (opportunity details)
router.get('/id/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await client.connect();
    const internship = await client
      .db('App')
      .collection('InternshipOpportunitiesData')
      .findOne({ _id: id });

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.json(internship);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching internship by ID');
  } finally {
    await client.close();
  }
});



//Get a internship posts for a given compant. return a list of all company posts
router.get('/:companyName', async (req, res) => {
  const companyName = req.params.companyName;
  try {
    await client.connect();
    const data = await client.db('App').collection('InternshipOpportunitiesData').find({company: companyName }).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error fetching internship opportunities for ${companyName}`);
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
