import { Routes, Route } from "react-router-dom";
import Details from "../components/Details";
export default function ApplicantDetails() {
  const applicant1 = {
    name: "Fatima Al-Dossari",
    email: "fatima.a@gmail.com",
    cv_path: "../app1-cv.pdf",
  };
  const applicant2 = {
    name: "Ahmed Al-Saud",
    email: "ahmed.s@gmail.com",
    cv_path: "/app2-cv.pdf",
  };
  const applicant3 = {
    name: "Omar Al-Harbi",
    email: "omar.h@gmail.com",
    cv_path: "/app3-cv.pdf",
  };
  const applicant4 = {
    name: "Nouf Al-Qahtani",
    email: "nouf.q@gmail.com",
    cv_path: "/app4-cv.pdf",
  };
  return (
    <Routes>
      <Route path="/1" element={<Details {...applicant1} />} />
      <Route path="/2" element={<Details {...applicant2} />} />
      <Route path="/3" element={<Details {...applicant3} />} />
      <Route path="/4" element={<Details {...applicant4} />} />
    </Routes>
  );
}
