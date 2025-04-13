import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewApplications from "./pages/ViewApplications.js";
import ApplicantDetails from "./pages/ApplicantDetails.js";
import TrackApplications from "./pages/TrackApplications.js";
import ApplicantionDetails from "./pages/ApplicationDetails.js";
import ReviewCompany from "./pages/ReviewCompany.js";
import ViewCompany from "./pages/ViewCompany.js";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/view-applicants" element={<ViewApplications />} />
      <Route path="/applicant-details/*" element={<ApplicantDetails />} />
      <Route path="/track-applications" element={<TrackApplications />} />
      <Route path="/application-details/*" element={<ApplicantionDetails />} />
      <Route path="/company-regestration" element={<ReviewCompany />} />
      <Route path="/companies/:id" element={<ViewCompany />} /> 
    </Routes>
  );
}

export default App;
