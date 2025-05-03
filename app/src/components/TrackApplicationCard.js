import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function TrackApplicationCard({ app }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const goToOpportunityDetails = () => {
    navigate(`/OpportunityDetails/${app._id}`);
  };

  const goToViewReviews = () => {
    const safeCompany = app.company;
    const safePosition = app.title;

    if (!safeCompany || !safePosition) {
      alert("This application is missing company or position information.");
      return;
    }

    navigate(`/CompanyReview/${safeCompany}/${safePosition}/reviews`);
  };
  const goToEdit = (id) => {
    console.log(id); // Debugging: check the value of id
    navigate(`/edit-opportunity/${app._id}`);
  };
  const goToViewApplications = () => {
    navigate(`/view-applicants/${app._id}`);
  };

  return (
    <Card className="mb-2 shadow-sm" style={{ cursor: "pointer" }}>
      <Card.Body>
        <Row className="align-items-center">
          <Col style={{ textAlign: "left" }}>
            <h5 style={{ fontSize: "26px", fontFamily: "Roboto" }}>
              {app.title}
            </h5>
            <p className="mb-1" style={{ fontSize: "16px", color: "#666666" }}>
              <strong>Company:</strong> {app.company}{" "}
            </p>
            <p className="mb-1" style={{ fontSize: "16px", color: "#666666" }}>
              <strong>Type:</strong> {app.type}
            </p>
            <p className="mb-1" style={{ fontSize: "16px", color: "#666666" }}>
              <strong>Location:</strong> {app.location}
            </p>
            <div
              className="d-flex flex-column flex-md-row align-items-start gap-3"
              style={{ color: "black", fontSize: "13px", marginTop: "10px" }}
            >
              <button
                className="third-btn"
                style={{
                  padding: "4px 8px",
                  fontSize: "14px",
                  borderRadius: "20px",
                  minWidth: "120px",
                }}
                onClick={goToOpportunityDetails}
              >
                View Details
              </button>
              <button
                className="third-btn"
                style={{
                  padding: "4px 8px",
                  fontSize: "14px",
                  borderRadius: "20px",
                  minWidth: "120px",
                }}
                onClick={goToViewApplications}
              >
                View Applicants
              </button>
              <button
                className="third-btn"
                style={{
                  padding: "4px 8px",
                  fontSize: "14px",
                  borderRadius: "20px",
                  minWidth: "120px",
                }}
                onClick={goToViewReviews}
              >
                View Ratings
              </button>
              <button
                className="third-btn"
                style={{
                  padding: "4px 8px",
                  fontSize: "14px",
                  borderRadius: "20px",
                  minWidth: "120px",
                }}
                onClick={goToEdit}
              >
                Edit
              </button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TrackApplicationCard;
