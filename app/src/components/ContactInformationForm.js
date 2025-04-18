import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import WithLabelExample from './ProgressBar.js'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaUniversity, FaUpload,FaBook,FaGraduationCap } from 'react-icons/fa';

//rawan
import { opportunities } from '../Data/dummyData';

function ContactInformationForm() {
    const navigate = useNavigate();

    //rawan
    const { id } = useParams();
    const opportunity = opportunities.find(o => o.id === parseInt(id));


    // Initial state to hold the user input values
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [location, setLocation] = useState('');
    const [gpa, setGpa] = useState('');
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [resume, setResume] = useState(null); // For the resume file


    // form error states
    const [errors, setErrors] = useState({});

    // Load stored form data from localStorage when the component mounts
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('contactInformation')) || {};
        setFullName(storedData.fullName || '');
        setEmail(storedData.email || '');
        setPhone(storedData.phone || '');
        setLinkedin(storedData.linkedin || '');
        setLocation(storedData.location || '');
        setGpa(storedData.gpa || '');
        setUniversity(storedData.university || '');
        setMajor(storedData.major || '');
        setResume(null);
    }, []);

    // handle form 
    const handleSubmit = (event) => {
        event.preventDefault();
        let formErrors = {};
        let valid = true;

        if (!fullName) {
            formErrors.fullName = 'Full name is required';
            valid = false;
        }
        if (!email) {
            formErrors.email = 'Email is required';
            valid = false;
        }
        if (!phone) {
            formErrors.phone = 'Phone number is required';
            valid = false;
        }
        if (!linkedin) {
            formErrors.linkedin = 'LinkedIn profile link is required';
            valid = false;
        }
        if (!location) {
            formErrors.location = 'Location is required';
            valid = false;
        }
        if (!gpa) {
            formErrors.gpa = 'GPA is required';
            valid = false;
        }
        if (!university) {
            formErrors.university = 'University is required';
            valid = false;
        }
        if (!major) {
            formErrors.major = 'Major is required';
            valid = false;
        }
        if (!resume) {
            formErrors.resume = 'Resume is required';
            valid = false;
        }

        setErrors(formErrors);

        if (valid) {
            // Create a data object
            const formData = {
                fullName,
                email,
                phone,
                linkedin,
                location,
                gpa,
                university,
                major,
            };

            // Save the form data to localStorage
            localStorage.setItem('contactInformation', JSON.stringify(formData));

            // Navigate to the next page
            navigate(`/general-informationForm/${id}}`);
        }


    };

    const handleBack = () => {
        navigate(`/opportunity/${id}`);
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResume(file);
        }
    };
    return (
        <Container className="mt-5">
            <div className="header py-4 text-center">
                <Row>
                    <Col>
                        <h1 className="text-center">Internship Application</h1>
                        <h2 className="text-center">
                            {opportunity ? `${opportunity.company} - ${opportunity.title}` : 'Internship Opportunity'}
                        </h2>
                    </Col>
                </Row>
            </div>

            <br />

            <WithLabelExample now={35} />

            <br />

            <h4 style={{ marginBottom: '20px' }}>Contact Information</h4>


            {/* Contact Information Form */}
            <Form onSubmit={handleSubmit}>
                {/* Full Name */}
                <Form.Group controlId="fullName" className="mb-4">
                    <Form.Label><FaUser style={{ color: '#FFB608', marginRight: '8px' }} /> Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        isInvalid={!!errors.fullName}
                        placeholder='Enter full name..'
                    />
                    <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group controlId="email" className="mb-4">
                    <Form.Label><FaEnvelope style={{ color: '#FFB608', marginRight: '8px' }} /> Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={!!errors.email}
                        placeholder=' Enter your email'
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                {/* Phone Number */}
                <Form.Group controlId="phone" className="mb-4">
                    <Form.Label><FaPhone style={{ color: '#FFB608', marginRight: '8px' }} /> Mobile Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        isInvalid={!!errors.phone}
                        placeholder='+966 5xxxxxxxx'
                    />
                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>

                {/* LinkedIn Profile Link */}
                <Form.Group controlId="linkedin" className="mb-4">
                    <Form.Label><FaLinkedin style={{ color: '#FFB608', marginRight: '8px' }} /> LinkedIn Profile Link</Form.Label>
                    <Form.Control
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        isInvalid={!!errors.linkedin}
                        placeholder='Enter the link..'
                    />
                    <Form.Control.Feedback type="invalid">{errors.linkedin}</Form.Control.Feedback>
                </Form.Group>

                {/* Location */}
                <Form.Group controlId="location" className="mb-4">
                    <Form.Label><FaMapMarkerAlt style={{ color: '#FFB608', marginRight: '8px' }} /> Location</Form.Label>
                    <Form.Control
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder='Country-Region-City'
                        isInvalid={!!errors.location}
                    >
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                </Form.Group>

                {/* GPA */}
                <Form.Group controlId="gpa" className="mb-4">
                    <Form.Label><FaGraduationCap style={{ color: '#FFB608', marginRight: '8px' }} />GPA</Form.Label>
                    <Form.Control
                        type="text"
                        value={gpa}
                        onChange={(e) => setGpa(e.target.value)}
                        isInvalid={!!errors.gpa}
                        placeholder='X/5 or X/4'
                    />
                    <Form.Control.Feedback type="invalid">{errors.gpa}</Form.Control.Feedback>
                </Form.Group>

                {/* University */}
                <Form.Group controlId="university" className="mb-4">
                    <Form.Label><FaUniversity style={{ color: '#FFB608', marginRight: '8px' }} /> University</Form.Label>
                    <Form.Control
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        isInvalid={!!errors.university}
                        placeholder='Enter name of the university..'
                    />
                    <Form.Control.Feedback type="invalid">{errors.university}</Form.Control.Feedback>
                </Form.Group>

                {/* Major */}
                <Form.Group controlId="major" className="mb-4">
                    <Form.Label><FaBook style={{ color: '#FFB608', marginRight: '8px' }} />Major</Form.Label>
                    <Form.Control
                        type="text"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        isInvalid={!!errors.major}
                        placeholder='Enter major..'
                    />
                    <Form.Control.Feedback type="invalid">{errors.major}</Form.Control.Feedback>
                </Form.Group>

                {/* Resume Upload */}
                <Form.Group controlId="resume" className="mb-4">
                    <Form.Label><FaUpload style={{ color: '#FFB608', marginRight: '8px' }} /> Upload Resume</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        isInvalid={!!errors.resume}
                    />
                    <Form.Control.Feedback type="invalid">{errors.resume}</Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <Form.Group className="mb-4 d-flex justify-content-end gap-2">
                    <button className='second-btn' onClick={handleBack}>Back</button>
                    <button className='def-btn' onClick={handleSubmit} type="submit" >Next</button>
                </Form.Group>
            </Form>


        </Container>
    );
}

export default ContactInformationForm;
