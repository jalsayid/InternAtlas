// CompanyStats.js
import React from "react";

export default function CompanyStats({ stats, onBack }) {
  return (
    <div className="card p-4 mt-4">
      <h5>Companies Numerical Statistics</h5>
      <ul>
        <li>Total Approved Companies: {stats.approved}</li>
        <li>Total Rejected Companies: {stats.rejected}</li>
        <li>Waiting for Approval: {stats.pending}</li>
        <li>Approval Rate: {stats.approvalRate}%</li>
      </ul>
      <button className="def-btn"  back onClick={onBack}>Back</button>
    </div>
  );
}
