import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { PersonCircle, Briefcase, ClipboardCheck, Star } from 'react-bootstrap-icons';
import logo from '../../assets/internatlas-logo.png';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Explore Training Opportunities",
      icon: <Briefcase className="card-icon" />,
      description: "Browse internships tailored to your field",
      route: "/search-opportunities"
    },
    {
      title: "Track Applications",
      icon: <ClipboardCheck className="card-icon" />,
      description: "Monitor your submitted applications in one place",
      route: "/track-applications"
    },
    {
      title: "Ratings & Reviews",
      icon: <Star className="card-icon" />,
      description: "See how others rated their internship experiences",
      route: "/search"
    }
  ];

  return (
    <div className="dashboard-wrapper">
      {/* Header with logout button */}
      <div className="dashboard-header px-4 py-2 d-flex justify-content-between align-items-center bg-light">
        <span className="text-muted small">Student Dashboard</span>
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => navigate('/')}
          >
            Logout
          </button>
          <div className="d-flex align-items-center gap-2">
            <PersonCircle size={24} />
            <span className="fw-bold">Hello, Student</span>
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

export default StudentDashboard;
