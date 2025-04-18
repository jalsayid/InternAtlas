import React from "react";

export default function SummaryCard({ title, count, onViewAll }) {
  return (
    <div className="card p-3 shadow rounded bg-white text-center" style={{ minWidth: "220px" }}>
      <h5 className="mb-2">{title}</h5>
      <h2 style={{ fontWeight: "bold" }}>{count}</h2>
      {onViewAll && (
        <button
          className="def-btn"
          onClick={onViewAll}
        >
          View all
        </button>
      )}
    </div>
  );
}
