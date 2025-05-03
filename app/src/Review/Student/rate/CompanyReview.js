import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import './CompanyReview.css';
import { useNavigate, useParams } from 'react-router-dom';
import StudentNavBar from '../../../StudentNavBar';

const CompanyReview = () => {
  const { companyName, position } = useParams();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`https://internatlas.onrender.com/api/reviews/${companyName}/${position}`);
        const data = await res.json();

        const mapped = data.map((r) => ({
          id: r._id,
          rating: r.rating,
          text: r.reviewText,
          response: r.companyResponse,
        }));

        setReviews(mapped);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [companyName, position]);

  const renderStars = (count) =>
    [...Array(5)].map((_, i) => (
      <StarFill key={i} className={`me-1 ${i < count ? 'text-warning' : 'text-secondary'}`} />
    ));

  return (
    <>
      <StudentNavBar />
      <Container className="py-4">
        <div className="d-flex align-items-center mt-3 mb-4">
          <i className="bi bi-building fs-3 text-secondary me-3"></i>
          <div>
            <h5 className="mb-0 text-capitalize company-name">{companyName}</h5>
            <small className="text-muted">{position}</small>
          </div>
          <div className="ms-auto text-primary d-flex align-items-center">
            <span className="me-1 fs-5 fw-semibold">
              {reviews.length > 0
                ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                : '0'}
            </span>
            <StarFill className="text-warning" />
          </div>
        </div>

        <Row className="mb-3 flex-wrap">
          <Col xs={6} md={3}><p><strong>Reputation</strong> {renderStars(4)}</p></Col>
          <Col xs={6} md={3}><p><strong>Social</strong> {renderStars(5)}</p></Col>
          <Col xs={6} md={3}><p><strong>Opportunities</strong> {renderStars(4)}</p></Col>
          <Col xs={6} md={3}><p><strong>Location</strong> {renderStars(4)}</p></Col>
        </Row>

        <button
          className="mb-4 btn-rectangle second-btn"
          onClick={() => navigate(`/company/${companyName}/${position}/write-review`)}
        >
          Write a review
        </button>

        <h5 className="mb-3">Student Reviews</h5>

        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-muted">No reviews yet. Be the first to write one!</p>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="mb-3 shadow-sm rounded-4">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex mb-2">
                  <i className="bi bi-person-circle fs-2 text-secondary me-3"></i>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-semibold">Anonymous Student</span>
                      <div>{renderStars(review.rating)}</div>
                    </div>
                    <p className="mb-1 text-muted">{review.text}</p>

                    {review.response && (
                      <div className="bg-light border rounded p-3 mt-2">
                        <strong className="d-block mb-1 text-warning">Company Response:</strong>
                        <span>{review.response}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </>
  );
};

export default CompanyReview;
