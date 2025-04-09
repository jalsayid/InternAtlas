import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CompanyViewApplications from "./CompanyViewApplications.js";
import ViewApplicantDetails from "./ViewApplicantDetails.js";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/view-applicants" element={<CompanyViewApplications />} />
      <Route path="/applicant-details" element={<ViewApplicantDetails />} />
    </Routes>
  );
}

export default App;
