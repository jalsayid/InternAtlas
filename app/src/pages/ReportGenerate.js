import React, { useState } from "react";
import SummaryCard from "../components/SummaryCard";
import CompanyStats from "../components/CompanyStat";
import ApprovalBarChart from "../components/ApprovalBarChart";
import MajorPieChart from "../components/MajorPieChart";
import OpportunitiesBarChart from "../components/OpportunitiesBarChart";
import { dashboardSummary, companyApprovalStats, opportunities } from "../Data/dummyData.js";
import { Modal } from "react-bootstrap";
import AdminNavbar from '../AdminNavbar.js';



export default function ReportGenerate() {
    const [selectedCompany, setSelectedCompany] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [showAllCompanies, setShowAllCompanies] = useState(false);

    const handleCompanyChange = (e) => setSelectedCompany(e.target.value);

    const chartData = [
        { label: "Approved", value: companyApprovalStats.approved },
        { label: "Rejected", value: companyApprovalStats.rejected },
    ];

    const pieData = [
        { label: "ISE", value: 15 },
        { label: "CHE", value: 10 },
        { label: "EE", value: 8 },
        { label: "ME", value: 12 },
    ];

    const companyCounts = opportunities.reduce((acc, curr) => {
        acc[curr.company] = acc[curr.company] || { count: 0, logo: curr.logo };
        acc[curr.company].count++;
        return acc;
    }, {});

    const opportunityCounts = Object.entries(companyCounts)
        .map(([label, info]) => ({ label, value: info.count, logo: info.logo }))
        .sort((a, b) => b.value - a.value);

    const displayedCompanies = showAllCompanies ? opportunityCounts : opportunityCounts.slice(0, 10);

    const handleViewAll = (title) => {
        setModalTitle(title);
        setModalContent(<CompanyStats stats={companyApprovalStats} onBack={() => setShowModal(false)} />);
        setShowModal(true);
    };

    return (
        <>
      <AdminNavbar />

        
        <div className="container mt-5">
            <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "#fffef3" }}>
                <h3 className="mb-4 text-center" style={{fontWeight: "bold" }}>
                    📊 Numerical Summaries Dashboard
                </h3>

                <div className="d-flex justify-content-center gap-5 mb-5">
                    <SummaryCard
                        title={<><span role="img" aria-label="students">👨‍🎓</span> Total Students</>}
                        count={dashboardSummary.totalStudents}
                        onViewAll={() => handleViewAll("Total Students")}
                    />
                    <SummaryCard
                        title={<><span role="img" aria-label="companies">🏢</span> Total Companies</>}
                        count={dashboardSummary.totalCompanies}
                        onViewAll={() => handleViewAll("Total Companies")}
                    />
                </div>

                <div className="mt-5 text-center">
                    <h5 className="mb-3">
                        {showAllCompanies ? "🏢 All Companies by Opportunities" : "🏆 Top 10 Companies by Opportunities"}
                    </h5>
                    <div className="p-3 shadow rounded bg-white">
                        <OpportunitiesBarChart data={displayedCompanies} />
                        <button
                            className="btn btn-sm mt-3"
                            style={{ backgroundColor: "#FFB608", color: "#fff" }}
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
                        {Object.keys(companyCounts).map((company, i) => (
                            <option key={i} value={company}>{company}</option>
                        ))}
                    </select>
                </div>

                {selectedCompany && (
                    <div className="mt-5">
                        <h4 className="mb-3">📈 {selectedCompany}'s Analytical Statistics</h4>
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <div className="p-3 shadow rounded bg-white">
                                    <h6 className="mb-3 text-secondary">Approval vs. Rejection Rates</h6>
                                    <ApprovalBarChart data={chartData} />
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="p-3 shadow rounded bg-white">
                                    <h6 className="mb-3 text-secondary">Accepted Students by Major</h6>
                                    <MajorPieChart data={pieData} />
                                </div>
                            </div>
                        </div>
                        <a href="/reportk.pdf" target="_blank" rel="noopener noreferrer">
                            <button
                                className="second-btn mt-3"
                            >
                                📄 Export as PDF
                            </button>
                        </a>
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
