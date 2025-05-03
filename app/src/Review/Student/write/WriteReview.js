import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { StarFill, InfoCircle } from 'react-bootstrap-icons';
import StudentNavBar from '../../../StudentNavBar';
import './WriteReview.css';

const WriteReview = () => {
    const { companyName, position } = useParams();
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

    // ✅ get logged-in user info from sessionStorage
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('loggedInUser');
    const userType = sessionStorage.getItem('userType');

    useEffect(() => {
        // if user is not logged in or not a student, redirect
        if (!userId || userType !== 'student') {
            alert('You must be logged in as a student to submit a review.');
            navigate('/login');
        }
    }, [userId, userType, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allRated = Object.values(ratings).every((r) => r > 0);
        const isCommentEmpty = comment.trim() === '';

        if (!allRated || isCommentEmpty) {
            setError(true);
            return;
        }

        setError(false);
        const overallRating = Math.round(Object.values(ratings).reduce((a, b) => a + b) / 4);

        try {
            const response = await fetch(`https://internatlas.onrender.com/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    company: companyName,
                    position: position,
                    studentId: userId,
                    studentName: username,
                    rating: overallRating,
                    reviewText: comment
                })
            });

            if (response.ok) {
                setShowThankYou(true);
                setTimeout(() => navigate(`/company/${companyName}/${encodeURIComponent(position)}`), 1500);
            } else {
                const data = await response.json();
                console.error('Review submission failed:', data);
                alert('Failed to submit review. Please try again.');
            }
        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Server error. Please try again later.');
        }
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
            <StudentNavBar />
            <Container className="my-5 review-container">
                <a href={`/company/${companyName}/${position}`} className="text-muted mb-3 d-inline-block">
                    &larr; Back to reviews
                </a>

                <div className="review-header mb-4">
                    <div className="d-flex align-items-center">
                        <i className="bi bi-building me-3"></i>
                        <div>
                            <h5 className="mb-0 company-name">{companyName}</h5>
                            <small className="text-muted">{position}</small>
                        </div>
                    </div>
                </div>

                <Alert variant="light" className="guideline-box">
                
  <h6><InfoCircle className="me-2" />Guidelines</h6>
  <ul className="mb-0">
    <li>Reviews containing profanity or offensive language may be flagged for moderation.</li>
    <li>Focus on constructive, professional feedback to help others learn from your experience.</li>
    <li>Please check your spelling and grammar before submitting.</li>
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
                        <Form.Label>Discuss your personal experience on this company. <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            className={error && comment.trim() === '' ? 'is-invalid' : ''}
                            placeholder="What’s great about it? What could use improvement?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        {error && comment.trim() === '' && (
                            <div className="invalid-feedback">Please fill out this field.</div>
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
