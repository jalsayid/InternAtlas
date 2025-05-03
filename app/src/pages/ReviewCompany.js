import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CompanyInfoCard from "../components/CompanyInfoCard";
import Header from "../components/Header";
import AdminNavbar from "../AdminNavbar.js";

export default function ReviewCompany() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingCompanies = async () => {
      try {
        const response = await fetch(
          `https://internatlas.onrender.com/api/companiesdata/pending`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch pending companies");
        }

        setCompanies(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPendingCompanies();
  }, []);

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <Container fluid style={{ paddingTop: "80px" }}>
          <Header title="Manage Company Requests" />
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminNavbar />
        <Container fluid style={{ paddingTop: "80px" }}>
          <Header title="Manage Company Requests" />
          <div className="text-center text-danger">Error: {error}</div>
        </Container>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <Container>
        <Header title="Manage Company Requests" />
        <Row className="g-4 px-4">
          {companies.length === 0 ? (
            <Col>
              <p className="text-center">No pending company requests</p>
            </Col>
          ) : (
            companies.map((company) => (
              <Col lg={3} md={6} sm={12} key={company._id}>
                <CompanyInfoCard
                  title={company.companyName}
                  info={
                    <>
                      <p>{company.description}</p>
                      <p>
                        <span className="pending-badge">pending</span>
                      </p>
                    </>
                  }
                  image={company.logo}
                  link={`/companies/${company._id}`}
                />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
}
