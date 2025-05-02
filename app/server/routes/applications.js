const express = require('express');
const router = express.Router();
const client = require('../config/db');
const { ObjectId } = require('mongodb');

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
        if (!questions) {
            return res.status(404).json({ message: 'Questions not found' });
        }
        
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

// GET route to fetch applications by internship ID
router.get('/internship/:internshipId', async (req, res) => {
    const internshipId = parseInt(req.params.internshipId);
    try {
        await client.connect();
        const db = client.db('App');
        const applicationCollection = db.collection('ApplicationData');
        
        const applications = await applicationCollection.find({ internshipId: internshipId }).toArray();
        res.json(applications);
    } catch (err) {
        console.error('Error fetching applications:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    } finally {
        await client.close();
    }
});

// GET route to fetch applications for a specific student with internship details
router.get('/student/:studentId', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('App');
        const applicationCollection = db.collection('ApplicationData');
        const internshipCollection = db.collection('InternshipOpportunitiesData');
        
        let studentObjectId;
        try {
            studentObjectId = new ObjectId(req.params.studentId);
        } catch (err) {
            console.error('Invalid ObjectId:', req.params.studentId);
            return res.status(400).json({ message: 'Invalid student ID format' });
        }
        
        // Find all applications for this student
        const applications = await applicationCollection.find({ 
            studentId: studentObjectId 
        }).toArray();

        // Get internship details for each application
        const applicationsWithDetails = await Promise.all(applications.map(async (application) => {
            const internship = await internshipCollection.findOne({ 
                _id: application.internshipId 
            });
            
            return {
                ...application,
                internshipDetails: internship
            };
        }));

        res.json(applicationsWithDetails);
    } catch (err) {
        console.error('Error fetching student applications:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    } finally {
        await client.close();
    }
});

// POST route to save student application
router.post('/', async (req, res) => {
    const { contactInformation, generalInformation, internshipId, studentId } = req.body;

    try {
        await client.connect();
        const db = client.db('App');
        const applicationCollection = db.collection('ApplicationData');
        
        const newApplication = {
            studentId: new ObjectId(studentId), // Convert string ID to ObjectId
            internshipId: parseInt(internshipId),
            contactInformation,
            generalInformation,
            status: 'pending',
            submittedAt: new Date()
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
