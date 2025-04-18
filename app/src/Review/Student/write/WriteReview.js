import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { StarFill, InfoCircle } from 'react-bootstrap-icons';
import './WriteReview.css';
import NavBar from '../StudentNavBar';
import { addReview } from '../../../Data/reviews';

const WriteReview = () => {
    const { companyName } = useParams();
    const navigate = useNavigate();

    const [comment, setComment] = useState('');
    const [ratings, setRatings] = useState({
        reputation: 0,
        social: 0,
        opportunities: 0,
        location: 0,
    });
    const [hoverRatings, setHoverRatings] = useState({
        reputation: 0,
        social: 0,
        opportunities: 0,
        location: 0,
    });
    const [error, setError] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const allRated = Object.values(ratings).every((r) => r > 0);
        const isCommentEmpty = comment.trim() === '';

        if (!allRated || isCommentEmpty) {
            setError(true);
            return;
        }

        setError(false);

        addReview(companyName, {
            text: comment,
            rating: Math.round(Object.values(ratings).reduce((a, b) => a + b) / 4),
            response: null
        });

        setShowThankYou(true);
        setTimeout(() => navigate(`/company/${companyName}`), 1500);
    };

    const renderStars = (field) => (
        [...Array(5)].map((_, i) => {
            const index = i + 1;
            return (
                <StarFill
                    key={index}
                    onClick={() => setRatings({ ...ratings, [field]: index })}
                    onMouseEnter={() => setHoverRatings({ ...hoverRatings, [field]: index })}
                    onMouseLeave={() => setHoverRatings({ ...hoverRatings, [field]: 0 })}
                    className={`me-1 pointer ${index <= (hoverRatings[field] || ratings[field]) ? 'text-warning' : 'text-secondary'}`}
                    style={{ fontSize: '1.5rem' }}
                />
            );
        })
    );

    return (
        <>
            <NavBar />
            <Container className="my-5 review-container">
                <a href={`/company/${companyName}`} className="text-muted mb-3 d-inline-block">
                    &larr; Back to reviews
                </a>

                <div className="review-header mb-4">
                    <div className="d-flex align-items-center">
                        <i className="bi bi-building me-3"></i>
                        <div>
                        <h5 className="mb-0 company-name">{companyName}</h5>

                            <small className="text-muted">Software Engineering Intern</small>
                        </div>
                    </div>
                    <div className="text-primary d-flex align-items-center">
                        <span className="me-1 fs-5 fw-semibold">4.5</span>
                        <StarFill className="text-warning" />
                    </div>
                </div>

                <Alert variant="light" className="guideline-box">
                    <h6><InfoCircle className="me-2" />Guidelines</h6>
                    <ul className="mb-0">
                        <li>Your rating could be removed if you use profanity or derogatory terms.</li>
                        <li>Refer to the rating categories to help you better elaborate your comments.</li>
                        <li>Don’t forget to proofread!</li>
                    </ul>
                </Alert>

                <Form onSubmit={handleSubmit}>
                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Label>Reputation <span className="text-danger">*</span></Form.Label>
                            <div className="review-stars">{renderStars('reputation')}</div>
                        </Col>
                        <Col md={6}>
                            <Form.Label>Social <span className="text-danger">*</span></Form.Label>
                            <div className="review-stars">{renderStars('social')}</div>
                        </Col>
                        <Col md={6}>
                            <Form.Label>Opportunities <span className="text-danger">*</span></Form.Label>
                            <div className="review-stars">{renderStars('opportunities')}</div>
                        </Col>
                        <Col md={6}>
                            <Form.Label>Location <span className="text-danger">*</span></Form.Label>
                            <div className="review-stars">{renderStars('location')}</div>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Discuss your personal experience on this company. <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            className={error && comment.trim() === '' ? 'is-invalid' : ''}
                            placeholder="What’s great about it? What could use improvement?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        {error && comment.trim() === '' && (
                            <div className="invalid-feedback">
                                Please fill out this field.
                            </div>
                        )}
                    </Form.Group>

                    <Button type="submit" className="def-btn">
                        Submit
                    </Button>
                </Form>

                {showThankYou && (
                    <Alert variant="success" className="mt-3">
                        ✅ Thank you for your feedback!
                    </Alert>
                )}
            </Container>
        </>
    );
};

export default WriteReview;
