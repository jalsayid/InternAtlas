const express = require('express');
const router = express.Router();
const client = require('../config/db'); 

router.get('/combined-summary', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('App');

    const students = db.collection('StudentData');
    const applications = db.collection('ApplicationData');
    const companies = db.collection('CompanyData');
    const internships = db.collection('InternshipOpportunitiesData');

    // Student summary
    const [totalStudents, totalApplications, totalAccepted, totalRejected, totalPending] = await Promise.all([
      students.countDocuments(),
      applications.countDocuments(),
      applications.countDocuments({ status: 'accepted' }),
      applications.countDocuments({ status: 'rejected' }),
      applications.countDocuments({ status: 'pending' })
    ]);

    const acceptancesByStudent = await applications.aggregate([
      { $match: { status: 'accepted' } },
      { $group: { _id: "$studentId", count: { $sum: 1 } } }
    ]).toArray();

    const totalAcceptanceCount = acceptancesByStudent.reduce((sum, s) => sum + s.count, 0);
    const avgAcceptances = acceptancesByStudent.length > 0
      ? (totalAcceptanceCount / acceptancesByStudent.length).toFixed(2)
      : "0.0";

    // Company summary
    const [totalApproved, totalRejectedC, totalPendingC] = await Promise.all([
      companies.countDocuments({ registrationStatus: 'accepted' }),
      companies.countDocuments({ registrationStatus: 'rejected' }),
      companies.countDocuments({ registrationStatus: 'pending' })
    ]);

    const totalCompanies = totalApproved + totalRejectedC + totalPendingC;
    const approvalRate = totalCompanies > 0 ? ((totalApproved / totalCompanies) * 100).toFixed(1) : "0.0";

    // Opportunity summary
    const opportunitySummary = await internships.aggregate([
      { $group: { _id: "$company", count: { $sum: 1 } } },
      { $project: { label: "$_id", value: "$count", _id: 0 } },
      { $sort: { value: -1 } }
    ]).toArray();

    res.json({
      studentSummary: {
        totalStudents,
        totalApplications,
        totalAccepted,
        totalRejected,
        totalPending,
        avgAcceptances
      },
      companySummary: {
        totalApproved,
        totalRejected: totalRejectedC,
        totalPending: totalPendingC,
        approvalRate
      },
      opportunitySummary
    });

  } catch (err) {
    console.error('Error in combined-summary:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  } finally {
    await client.close();
  }
});

module.exports = router;



// opportunity bar ( top 10 and general view)
  router.get('/opportunity-summary', async (req, res) => {
    try {
      await client.connect();
      const db = client.db('App');
      const internships = db.collection('InternshipOpportunitiesData'); // adjust name if needed
  
      const result = await internships.aggregate([
        {
          $group: {
            _id: "$company",
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            label: "$_id",
            value: "$count",
            _id: 0
          }
        },
        { $sort: { value: -1 } }
      ]).toArray();
  
      res.json(result);
    } catch (err) {
      console.error("Error in opportunity-summary:", err);
      res.status(500).json({ error: "Server error", message: err.message });
    } finally {
      await client.close();
    }
  });
  


  // route to get the nummaries for a selected copamy for teh majotPie and approvedBar
  router.get('/company-analytics/:companyName', async (req, res) => {
    const companyName = req.params.companyName;
  
    try {
      await client.connect();
      const db = client.db('App');
      const applications = db.collection('ApplicationData');
      const students = db.collection('StudentData');
  
      // Count approved/rejected for the company
      const approvalStats = await applications.aggregate([
        {
          $lookup: {
            from: "InternshipOpportunitiesData",
            localField: "internshipId",
            foreignField: "_id",
            as: "internship"
          }
        },
        { $unwind: "$internship" },
        { $match: { "internship.company": companyName } },
        {
          $group: {
            _id: "$status",  // accepted / rejected / pending
            count: { $sum: 1 }
          }
        }
      ]).toArray();
      
  
      const approvalData = [
        { label: "accepted", value: 0 },
        { label: "rejected", value: 0 }
      ];
      
  
      approvalStats.forEach(item => {
        const match = approvalData.find(d => d.label.toLowerCase() === item._id.toLowerCase().trim());
        if (match) match.value = item.count;
      });

  
      // Group approved applications by student major
      //const acceptedApps = await applications.find({ company: companyName, status: "accepted" }).toArray();
      //const studentIds = acceptedApps.map(app => app.studentId);
  
// Group accepted applications by contactInformation.major directly
const majors = await applications.aggregate([
  {
    $match: {
      status: "accepted",
      "contactInformation.major": { $exists: true, $ne: null }
    }
  },
  {
    $lookup: {
      from: "InternshipOpportunitiesData",
      localField: "internshipId",
      foreignField: "_id",
      as: "internship"
    }
  },
  { $unwind: "$internship" },
  {
    $match: {
      "internship.company": companyName
    }
  },
  {
    $group: {
      _id: "$contactInformation.major",
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      label: "$_id",
      value: "$count",
      _id: 0
    }
  }
]).toArray();


  
      res.json({
        approvalData,
        majorData: majors
      });
    } catch (err) {
      console.error("Company analytics error:", err);
      res.status(500).json({ message: "Internal server error", error: err.message });
    } finally {
      await client.close();
    }
  });
  
  
