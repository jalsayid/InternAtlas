import React, { useState} from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import WithLabelExample from './ProgressBar.js'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaUniversity, FaUpload } from 'react-icons/fa';

function ContactInformationForm() {
    const navigate = useNavigate();


    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [location, setLocation] = useState('');
    const [gpa, setGpa] = useState('');
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [resume, setResume] = useState(null);

    // form error states
    const [errors, setErrors] = useState({});
    
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
            navigate('/general-informationForm');
        }

    };

    const handleBack = () => {
        //navigate('/');  
    };


    return (
        <Container className="mt-5">

            <h1 className="text-center">Internship Application</h1>
            <h2 className="text-center">Sabic - Software Engineering Intern</h2>

            <WithLabelExample now={35} />

            <br />

            <h4 style={{ marginBottom: '20px' }}>Contact Information</h4>


            {/* Contact Information Form */}
            <Form onSubmit={handleSubmit}>
                {/* Full Name */}
                <Form.Group controlId="fullName" className="mb-4">
                    <Form.Label><FaUser /> Full Name</Form.Label>
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
                    <Form.Label><FaEnvelope /> Email</Form.Label>
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
                    <Form.Label><FaPhone /> Mobile Phone Number</Form.Label>
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
                    <Form.Label><FaLinkedin /> LinkedIn Profile Link</Form.Label>
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
                    <Form.Label><FaMapMarkerAlt /> Location</Form.Label>
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
                    <Form.Label>GPA</Form.Label>
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
                    <Form.Label><FaUniversity /> University</Form.Label>
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
                    <Form.Label>Major</Form.Label>
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
                    <Form.Label><FaUpload /> Upload Resume</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => setResume(e.target.files[0])}
                        isInvalid={!!errors.resume}
                    />
                    <Form.Control.Feedback type="invalid">{errors.resume}</Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <Form.Group className="mb-4 d-flex justify-content-end">
                    <Button variant="secondary" onClick={handleBack} style={{ color: 'black', width: '120px', marginRight: '10px' }}>Back</Button>
                    <Button variant="primary" type="submit" style={{ width: '120px' }} >Next</Button>
                </Form.Group>
            </Form>


        </Container>
    );
}

export default ContactInformationForm;
