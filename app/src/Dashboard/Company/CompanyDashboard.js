import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Dashboard.css';
import logo from '../../assets/internatlas-logo.png';
import { useNavigate } from 'react-router-dom';
import { PersonCircle, ClipboardPlus, PeopleFill } from 'react-bootstrap-icons';

const CompanyDashboard = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Post New Opportunity",
      icon: <ClipboardPlus className="card-icon" />,
      description: "Create a new internship opportunity for students",
      route: "/post-opportunity"
    },
    {
      title: "Manage Applications",
      icon: <PeopleFill className="card-icon" />,
      description: "Review and respond to student applications",
      route: "/company/applications"
    }
  ];

 return (
    <div className="dashboard-wrapper">
      {/* Header with logout button */}
      <div className="dashboard-header px-4 py-2 d-flex justify-content-between align-items-center bg-light">
        <span className="text-muted small">Company Dashboard</span>
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => navigate('/')}
          >
            Logout
          </button>
          <div className="d-flex align-items-center gap-2">
            <PersonCircle size={24} />
            <span className="fw-bold">Hello, Sabic</span>
          </div>
        </div>
      </div>

  

      <Container className="text-center py-5">
        <img src={logo} height="210" className="mb-4" alt="InternAtlas Logo" />

        <Row className="justify-content-center gy-4">
          {options.map((opt, i) => (
            <Col xs={12} md={4} key={i}>
              <div className="flip-card" onClick={() => navigate(opt.route)}>
                <div className="flip-inner">
                  <div className="flip-front">
                    {opt.icon}
                    <h6 className="mt-2 fw-bold">{opt.title}</h6>
                  </div>
                  <div className="flip-back">
                    <p>{opt.description}</p>
                    <span className="text-warning fw-bold mt-2">Click to enter →</span>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default CompanyDashboard;
