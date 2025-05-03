import React, { useState, useEffect } from "react";
import SummaryCard from "../components/SummaryCard";
import ApprovalBarChart from "../components/ApprovalBarChart";
import MajorPieChart from "../components/MajorPieChart";
import OpportunitiesBarChart from "../components/OpportunitiesBarChart";
import { Modal } from "react-bootstrap";
import AdminNavbar from "../AdminNavbar.js";

export default function ReportGenerate() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  const [studentSummary, setStudentSummary] = useState(null);
  const [companySummary, setCompanySummary] = useState(null);
  const [opportunitySummary, setOpportunitySummary] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [approvalChartData, setApprovalChartData] = useState([]);
  const [majorPieData, setMajorPieData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [companyDataLoaded, setCompanyDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${REACT_APP_API_URL}/api/reports/combined-summary`);
        const data = await res.json();

        if (data.studentSummary) setStudentSummary(data.studentSummary);

        if (data.companySummary) {
          const { totalApproved, totalRejected, totalPending, approvalRate } = data.companySummary;
          setCompanySummary({
            totalApproved: Number(totalApproved),
            totalRejected: Number(totalRejected),
            totalPending: Number(totalPending),
            approvalRate: Number(approvalRate),
          });
          setCompanyDataLoaded(true);
        }

        if (Array.isArray(data.opportunitySummary)) {
          setOpportunitySummary(data.opportunitySummary);
          setCompanyList(data.opportunitySummary.map((c) => c.label));
        }
      } catch (err) {
        console.error("Failed to load combined summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCompanyChange = async (e) => {
    const selected = e.target.value;
    setSelectedCompany(selected);

    if (!selected) return;

    try {
      const res = await fetch(`${REACT_APP_API_URL}/api/reports/company-analytics/${encodeURIComponent(selected)}`);
      const data = await res.json();
      console.log(`Analytics for ${selected}:`, data);

      const approval = data.approvalData?.map((d) => ({ label: d.label, value: Number(d.value) })) || [];
      const majors = data.majorData?.map((d) => ({ label: d.label, value: Number(d.value) })) || [];

      setApprovalChartData(approval);
      setMajorPieData(majors);
    } catch (err) {
      console.error("Failed to fetch analytics for company:", err);
      setApprovalChartData([]);
      setMajorPieData([]);
    }
  };

  const displayedCompanies = Array.isArray(opportunitySummary)
    ? showAllCompanies
      ? opportunitySummary
      : opportunitySummary.slice(0, 10)
    : [];

  const handleViewAll = (title) => {
    setModalTitle(title);

    if (title === "Total Students" && studentSummary) {
      setModalContent(
        <div>
          <p>✅ Total Students Registered: {studentSummary.totalStudents}</p>
          <p>📩 Total Applications Submitted: {studentSummary.totalApplications}</p>
          <p>🟢 Total Acceptances: {studentSummary.totalAccepted}</p>
          <p>🔴 Total Rejections: {studentSummary.totalRejected}</p>
          <p>⏳ Pending Applications: {studentSummary.totalPending}</p>
          <p>📊 Average Acceptances: {studentSummary.avgAcceptances}</p>
        </div>
      );
    } else if (title === "Total Companies" && companySummary) {
      setModalContent(
        <div>
          <p>🟢 Total Approved Companies: {companySummary.totalApproved}</p>
          <p>🔴 Total Rejected Companies: {companySummary.totalRejected}</p>
          <p>⏳ Waiting for Approval: {companySummary.totalPending}</p>
          <p>📊 Approval Rate: {companySummary.approvalRate}%</p>
        </div>
      );
    }

    setShowModal(true);
  };

  return (
    <>
      <AdminNavbar />
      <h1 className="page-title" style={{ marginLeft: "20px" }}>Generate Reports</h1>

      <div className="container mt-5">
        <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "#fffef3" }}>
          <h2 className="animated-subtitle text-break" style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
            Hey Admin! Here's What's Happening
          </h2>

          <h3 className="mb-4 text-center" style={{ fontWeight: "bold" }}>
            📊 Numerical Summaries
          </h3>

          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex flex-wrap justify-content-center gap-4 mb-5">
                <SummaryCard
                  title={<><span role="img" aria-label="students">👨‍🎓</span> Total Students</>}
                  count={studentSummary?.totalStudents ?? "–"}
                  onViewAll={() => handleViewAll("Total Students")}
                />

                <SummaryCard
                  title={<><span role="img" aria-label="companies">🏢</span> Total Companies</>}
                  count={
                    !companyDataLoaded
                      ? "–"
                      : companySummary.totalApproved + companySummary.totalRejected + companySummary.totalPending
                  }
                  onViewAll={() => handleViewAll("Total Companies")}
                />
              </div>
            </>
          )}

          <div className="mt-5 text-center">
            <h5 className="mb-3">
              {showAllCompanies ? "🏢 All Companies by Opportunities" : "🏆 Top 10 Companies by Opportunities"}
            </h5>
            <div className="p-3 shadow rounded bg-white overflow-auto">
              <div style={{ minWidth: "400px" }}>
                <OpportunitiesBarChart data={displayedCompanies} />
              </div>
              <button
                className="def-btn mt-3"
                onClick={() => setShowAllCompanies(!showAllCompanies)}
              >
                {showAllCompanies ? "Show Top 10 Only" : "Show All Companies"}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="companySelect" className="form-label fw-bold text-secondary">Select Company to Analyze</label>
            <select id="companySelect" className="form-select shadow-sm" onChange={handleCompanyChange}>
              <option value="">-- Choose Company --</option>
              {companyList.map((company, i) => (
                <option key={i} value={company}>{company}</option>
              ))}
            </select>
          </div>

          {selectedCompany && (
            <div className="mt-5">
              <h4 className="mb-3">📈 {selectedCompany}'s Analytical Statistics</h4>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="p-3 shadow rounded bg-white overflow-auto">
                    <div style={{ minWidth: "350px" }}>
                      <h6 className="mb-3 text-secondary">Approval vs. Rejection Rates</h6>
                      {approvalChartData.length > 0 ? (
                        <ApprovalBarChart data={approvalChartData} />
                      ) : (
                        <p className="text-muted">No approval data available.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="p-3 shadow rounded bg-white overflow-auto">
                    <div style={{ minWidth: "350px" }}>
                      <h6 className="mb-3 text-secondary">Accepted Students by Major</h6>
                      {majorPieData.length > 0 ? (
                        <MajorPieChart data={majorPieData} />
                      ) : (
                        <p className="text-muted">No major data available.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton style={{ backgroundColor: "#fffef3" }}>
            <Modal.Title className="fw-bold text-dark">{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#fffef3", borderRadius: "10px", padding: "20px" }}>
            {modalContent}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
