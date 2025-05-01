// routes/applications.js
const express = require('express');
const router = express.Router();
const client = require('../config/db');

// POST /api/applications — Create a new internship application
router.post('/', async (req, res) => {
    const { contactInformation, generalInformation, internshipId, studentId } = req.body;

    try {
        await client.connect();

        const result = await client.db('App').collection('ApplicationData').insertOne({
            studentId,
            internshipId,
            contactInformation,
            generalInformation,
            status: 'pending',
        });

        res.status(201).json({
            message: 'Application submitted successfully!',
            applicationId: result.insertedId
        });
    } catch (err) {
        console.error('Error submitting application:', err);
        res.status(500).send('Internal server error');
    }
});

router.get('/:username', async (req, res) => {
    try {
      const db = req.app.locals.db;
      const student = await db.collection('StudentData').findOne({ username: req.params.username });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.json({
        student
      });
    } catch (err) {
      console.error('Error fetching student:', err);
      res.status(500).send('Internal server error');
    }
  });

module.exports = router;
