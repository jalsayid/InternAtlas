import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewApplications from "./pages/ViewApplications.js";
import ApplicantDetails from "./pages/ApplicantDetails.js";
import TrackApplications from "./pages/TrackApplications.js";
import ApplicationDetails from "./pages/ApplicationDetails.js";
import ReviewCompany from "./pages/ReviewCompany.js";
import ViewCompany from "./pages/ViewCompany.js";
import ModerateContentNav from './components/ModerateContentNav.js';
import OpportunityDetails from "./components/OpportunityDetails.js";
import TrackApplicationsCompany from "./components/TrackApplications.js";

import TrackApplicationsRawan from './pages/TrackApplicationsRawan.js';

import SearchCompany from './Review/Student/Search/SearchCompany';
import CompanyReview from './Review/Student/rate/CompanyReview';
import WriteReview from './Review/Student/write/WriteReview';
import CompanyPageReviews from "./Review/Company/details/CompanyPageReviews";
import StudentDashboard from "./Dashboard/Student/StudentDashboard";
import CompanyDashboard from "./Dashboard/Company/CompanyDashboard";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard";

import SignTaps from './components/SignTaps.js';
import PostInternshipForm from './components/PostInternshipForm.js';
import EditInternshipForm from './components/EditInternshipForm.js';
import ContactInformationForm from './components/ContactInformationForm.js';
import GeneralInformationForm from './components/GeneralInformationForm.js';
import SearchOpportunities from './pages/SearchOpportunities.js'
import LandingPage from './pages/LandingPage.js'
import ManageApplications from "./components/ManageApplications.js"


import OpportunityDetailsPage from './pages/OpportunityDetailsPageStudent';


import ReportGenerate from './pages/ReportGenerate'; 

import WelcomeScreen from "./pages/WelcomeScreen.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<LandingPage />} />

        <Route path="/view-applicants" element={<ViewApplications />} />
        <Route path="/applicant-details/*" element={<ApplicantDetails />} />
        <Route path="/track-applications" element={<TrackApplications />} /> //joud
        <Route path="/application-details/*" element={<ApplicationDetails />} />
        <Route path="/company-regestration" element={<ReviewCompany />} />
        <Route path="/companies/:id" element={<ViewCompany />} />
        <Route path="/OpportunityDetails/:id" element={<OpportunityDetails />} />
        <Route path="/ModerateContentNav" element={<ModerateContentNav />} />
        <Route path="/company/applications" element={<TrackApplicationsCompany />} /> //dana
        <Route path="/company/applications" element={<ManageApplications />} /> // has been linked in the company dashboard - aryam


        //new routes from Rawan
        <Route path="/search-opportunities" element={<SearchOpportunities />} /> // has been linked in the student dashboard - aryam
        <Route path="/TrackApplicationsRawan" element={<TrackApplicationsRawan />} />
        <Route path="/admin/reports" element={<ReportGenerate />} /> // has been linked in the admin dashboard - aryam
        <Route path="/opportunity/:id" element={<OpportunityDetailsPage />} />

        <Route path="/submit-application/:id" element={<ContactInformationForm />} />



        <Route path="/welcome" element={<WelcomeScreen userName="User"/>} /> //ممكن هنا نحط اسم اليوزر الفعلي 












        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/search" element={<SearchCompany />} />
        <Route path="/company/:companyName/write-review" element={<WriteReview />} />
        <Route path="/company/:companyName" element={<CompanyReview />} />
        <Route path="/CompanyReview/:companyName/:position/reviews" element={<CompanyPageReviews />} /> // has been linked in the track applications - aryam

    

        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/company" element={<CompanyDashboard />} /> //

        <Route path="/search-opportunities" element={<SearchOpportunities />} />

        <Route path="/login" element={<SignTaps />} />
        <Route path="/post-opportunity" element={<PostInternshipForm />} /> // has been linked in the company dashboard - aryam
        <Route path="/edit-opportunity/:id" element={<EditInternshipForm />} /> 
        <Route path="/contact-informationForm/:id" element={<ContactInformationForm />} /> //معلومات التسجيل الاسم وكذا
        <Route path="/general-informationForm/:id" element={<GeneralInformationForm />} /> //اسئلة تخص الشركة

        <Route path="/landing-page" element={<LandingPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
