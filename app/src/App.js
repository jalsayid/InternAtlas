import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewApplications from "./pages/ViewApplications.js";
import ApplicantDetails from "./pages/ApplicantDetails.js";
import TrackApplications from "./pages/TrackApplications.js";
import ApplicationDetails from "./pages/ApplicationDetails.js";
import ReviewCompany from "./pages/ReviewCompany.js";
import ViewCompany from "./pages/ViewCompany.js";
import ModerateContentNav from './components/ModerateContentNav.js';
import OpportunityDetails from "./components/OpportunityDetails.js";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchCompany from './Review/Student/Search/SearchCompany';
import CompanyReview from './Review/Student/rate/CompanyReview';
import WriteReview from './Review/Student/write/WriteReview';
import CompanyPageReviews from "./Review/Company/details/CompanyPageReviews";
import StudentDashboard from "./Dashboard/Student/StudentDashboard";
import CompanyDashboard from "./Dashboard/Company/CompanyDashboard";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/view-applicants" element={<ViewApplications />} />
        <Route path="/applicant-details/*" element={<ApplicantDetails />} />
        <Route path="/track-applications" element={<TrackApplications />} />
        <Route path="/application-details/*" element={<ApplicationDetails />} />
        <Route path="/company-regestration" element={<ReviewCompany />} />
        <Route path="/companies/:id" element={<ViewCompany />} />
        <Route path="/OpportunityDetails" element={<OpportunityDetails />} />
        <Route path="/ModerateContentNav" element={<ModerateContentNav />} />

        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/search" element={<SearchCompany />} />
        <Route path="/company/:companyName/write-review" element={<WriteReview />} />
        <Route path="/company/:companyName" element={<CompanyReview />} />
        <Route path="/CompanyReview" element={<CompanyPageReviews />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/company" element={<CompanyDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
