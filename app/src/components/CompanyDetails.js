import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import AdminNavbar from "../AdminNavbar";
import { useNavigate } from "react-router-dom";

export default function CompanyDetails({
  name,
  email,
  description,
  documents,
  logo,
}) {
  const [showAcceptAlert, setShowAcceptAlert] = useState(false);
  const [showRejectAlert, setShowRejectAlert] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleViewDocument = (docPath) => {
    window.open(`/docs/pdf-viewer.html?file=${docPath}`, "_blank");
  };

  const handleApprove = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_API_URL}/api/companiesdata/${name}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "accepted" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve company");
      }

      setShowAcceptAlert(true);
      setShowRejectAlert(false);
      // Redirect to review company page after 2 seconds
      setTimeout(() => navigate("/company-regestration"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_API_URL}/api/companiesdata/${name}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reject company");
      }

      setShowRejectAlert(true);
      setShowAcceptAlert(false);
      // Redirect to review company page after 2 seconds
      setTimeout(() => navigate("/company-regestration"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      <Container style={{ justifyContent: "center", paddingTop: "80px" }}>
        <Row className="justify-content-center w-100">
          {/* Error Alert */}
          {error && (
            <div
              style={{
                position: "fixed",
                top: "100px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                width: "50%",
              }}
            >
              <Alert
                variant="danger"
                onClose={() => setError(null)}
                dismissible
              >
                {error}
              </Alert>
            </div>
          )}

          {/* Success/Reject Alerts */}
          <div
            style={{
              position: "fixed",
              top: "100px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
              width: "50%",
            }}
          >
            {showAcceptAlert && (
              <Alert
                variant="success"
                onClose={() => setShowAcceptAlert(false)}
                dismissible
              >
                Company request has been approved!
              </Alert>
            )}
            {showRejectAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowRejectAlert(false)}
                dismissible
              >
                Company request has been rejected!
              </Alert>
            )}
          </div>

          {/* Company Information */}
          <Col md={6} className="mb-4">
            <Card className="p-4">
              <div className="text-center mb-4">
                <img
                  src={logo}
                  alt="Company Logo"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <h2 className="h2-joud mb-4">Company Information</h2>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" value={name} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={description}
                    readOnly
                  />
                </Form.Group>
              </Form>
            </Card>
          </Col>

          {/* Verification Documents */}
          <Col md={6}>
            <Card className="p-4">
              <h2 className="h2-joud mb-4">Verification Documents</h2>
              {documents.map((doc, index) => (
                <Form.Group key={index} className="mb-4">
                  <Form.Label>{doc.title}</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="text"
                      value={doc.filename}
                      readOnly
                      className="me-2"
                    />
                    <button
                      onClick={() => handleViewDocument(doc.path)}
                      className="third-btn"
                    >
                      View
                    </button>
                  </div>
                </Form.Group>
              ))}
            </Card>
          </Col>

          {/* Action Buttons */}
          <Row>
            <Col className="d-flex justify-content-center gap-3 mb-5">
              <button className="def-btn" onClick={handleApprove}>
                Approve Company
              </button>
              <button className="second-btn" onClick={handleReject}>
                Reject Company
              </button>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}
