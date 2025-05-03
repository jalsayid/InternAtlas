import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import StudentNavBar from '../../../StudentNavBar';
import './SearchCompany.css';



const CompanySearch = () => {
  const { companyName } = useParams();
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await fetch(`${REACT_APP_API_URL}/api/internships`);
        const data = await res.json();
        const filtered = data.filter(
          op => op.company.toLowerCase() === companyName.toLowerCase()
        );
        setOpportunities(filtered);
      } catch (err) {
        console.error('Error fetching internships:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [companyName]);

  

  return (
    <>
      <StudentNavBar />
      <Container className="py-4">
        <h2 className="mb-4">Opportunities at {companyName}</h2>

        {loading ? (
          <p>Loading...</p>
        ) : opportunities.length === 0 ? (
          <p>No opportunities found for this company.</p>
        ) : (
          <Row>
            {opportunities.map((op, i) => (
              <Col md={6} lg={4} className="mb-4" key={i}>
                <Card className="shadow-sm rounded-4 p-3">
                  <Card.Body>
                    <h5 className="fw-bold">{op.title}</h5>
                    <p className="mb-1 text-muted">{op.type} • {op.location}</p>
                    <p className="small">{op.description}</p>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        navigate(`/company/${op.company}/${encodeURIComponent(op.title)}`)
                      }
                    >
                      View Reviews
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default CompanySearch;
