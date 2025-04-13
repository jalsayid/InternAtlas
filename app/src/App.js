import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CompanyViewApplications from "./CompanyViewApplications.js";
import ViewApplicantDetails from "./ViewApplicantDetails.js";
import { Routes, Route } from "react-router-dom";
import ModerateContentNav from './components/ModerateContentNav.js';
import TrackApplications from './components/TrackApplications.js'
import OpportunityDetails from "./components/OpportunityDetails.js"

function App() {
  return (
    <Routes>
      <Route path="/view-applicants" element={<CompanyViewApplications />} />
      <Route path="/applicant-details" element={<ViewApplicantDetails />} />
      <Route path="/TrackApplications" element={<TrackApplications />} />
      <Route path="/OpportunityDetails" element={<OpportunityDetails />} />
      <Route path="/ModerateContentNav" element={<ModerateContentNav />} />

    </Routes>
  );
}

export default App;
