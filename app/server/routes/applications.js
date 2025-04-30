// POST route to save student application
app.post('/api/applications', async (req, res) => {
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
