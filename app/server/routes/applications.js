const express = require('express');
const router = express.Router();
const client = require('../config/db');

// GET route to fetch a specific application by ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await client.connect();
        const db = client.db('App');
        const applicationCollection = db.collection('ApplicationData');
        const questionsCollection = db.collection('Questions');
        
        // Fetch application data
        const application = await applicationCollection.findOne({_id: id});
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        const questions = await questionsCollection.findOne({});

        // Fetch questions and transform them
        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: 'Questions not found' });
        }
        if (!questions) {
            return res.status(404).json({ message: 'Questions not found' });
        }
        // Combine application data with questions
        const response = {
            application,
            questions
        };

        res.json(response);
    } catch (err) {
        console.error('Error fetching application:', err);
        res.status(500).send({ message: 'Internal server error', error: err.message });
    } finally {
        await client.close();
    }
});

// POST route to save student application
router.post('/api/applications', async (req, res) => {
    const { contactInformation, generalInformation, internshipId, studentId } = req.body;

    try {
        await client.connect();
        const db = client.db('App');
        const applicationCollection = db.collection('ApplicationData');
        
        const newApplication = {
            studentId,
            internshipId,
            contactInformation,
            generalInformation,
            status: 'pending', // default status
        };

        const result = await applicationCollection.insertOne(newApplication);

        res.status(201).json({ message: 'Application submitted successfully!', applicationId: result.insertedId });
    } catch (err) {
        console.error('Error submitting application:', err);
        res.status(500).send('Internal server error');
    } finally {
        await client.close();
    }
});

module.exports = router;
