import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { PersonCircle, ShieldLock, BuildingGear, BarChartSteps } from 'react-bootstrap-icons';
import logo from '../../assets/internatlas-logo.png';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Moderate Content",
      icon: <ShieldLock className="card-icon" />,
      description: "Review and manage reported or flagged content",
      route: "/ModerateContentNav"
    },
    {
      title: "Manage Company Requests",
      icon: <BuildingGear className="card-icon" />,
      description: "Approve or reject company registration requests",
      route: "/admin/companies"
    },
    {
      title: "Generate Reports",
      icon: <BarChartSteps className="card-icon" />,
      description: "Visualize platform usage and insights",
      route: "/admin/reports"
    }
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header px-4 py-2 d-flex justify-content-between align-items-center">
        <span className="text-muted small">Admin Dashboard</span>
        <div className="d-flex align-items-center gap-2">
          <PersonCircle size={24} />
          <span className="fw-bold">Hello, Admin</span>
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

export default AdminDashboard;
