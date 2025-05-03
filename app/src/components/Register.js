import React, { useState } from 'react';
import { Button, Form, Container, Tab, Tabs } from 'react-bootstrap';
import Alter from './Alert';


function Register({ onSwitchToRegister }) {
    const [key, setKey] = useState('register');

    const [showStudentAlert, setSrudentShowAlert] = useState(false);
    const [showCompanyAlert, setCompanyShowAlert] = useState(false);

    const [studentFullName, setStudentFullName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentUsername, setStudentUsername] = useState('');
    const [studentPassword, setStudentPassword] = useState('');
    const [studentConfirmPassword, setStudentConfirmPassword] = useState('');
    const [studentUniversity, setStudentUniversity] = useState('');
    const [studentMajor, setStudentMajor] = useState('');
    const [studentLocation, setStudentLocation] = useState('');
    const [studentFormErrors, setStudentFormErrors] = useState({});

    const [companyName, setCompanyName] = useState('');
    const [companySector, setCompanySector] = useState('');
    const [companyUsername, setCompanyUsername] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyPassword, setCompanyPassword] = useState('');
    const [companyConfirmPassword, setCompanyConfirmPassword] = useState('');
    const [companyVerification, setCompanyVerification] = useState(null);
    const [companyDescription, setCompanyDescription] = useState('');
    const [companyLogo, setCompanyLogo] = useState('');
    const [companyFormErrors, setCompanyFormErrors] = useState({});

    const studentHandleSubmit = async (event) => {
        event.preventDefault();
        setStudentFormErrors({});
        const errors = {};

        if (!studentUsername) errors.studentUsername = 'Username is required';
        if (!studentFullName) errors.studentFullName = 'Full name is required';
        if (!studentEmail) errors.studentEmail = 'Email is required';
        if (!studentPassword) errors.studentPassword = 'Password is required';
        if (!studentConfirmPassword) errors.studentConfirmPassword = 'Confirm password is required';
        if (studentPassword !== studentConfirmPassword) errors.studentConfirmPassword = 'Passwords do not match';
        if (!studentUniversity) errors.studentUniversity = 'University is required';
        if (!studentMajor) errors.studentMajor = 'Major is required';
        if (!studentLocation) errors.studentLocation = 'Location is required';

        if (Object.keys(errors).length > 0) {
            setStudentFormErrors(errors);
        } else {
            // Send POST request to register student
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userType: 'student',
                    fullName: studentFullName,
                    username: studentUsername,
                    email: studentEmail,
                    password: studentPassword,
                    confirmPassword: studentConfirmPassword,
                    university: studentUniversity,
                    major: studentMajor,
                    location: studentLocation,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setSrudentShowAlert(true);
                setTimeout(() => setSrudentShowAlert(false), 10000);

                // Clear form fields
                setStudentUsername('');
                setStudentFullName('');
                setStudentEmail('');
                setStudentPassword('');
                setStudentConfirmPassword('');
                setStudentUniversity('');
                setStudentMajor('');
                setStudentLocation('');
            }
        }
    };

    const companyHandleSubmit = async (event) => {
        event.preventDefault();
        setCompanyFormErrors({});
        const errors = {};

        if (!companyName) errors.companyName = 'Company name is required';
        if (!companySector) errors.companySector = 'Sector is required';
        if (!companyUsername) errors.companyUsername = 'Username is required';
        if (!companyEmail) errors.companyEmail = 'Email is required';
        if (!companyPassword) errors.companyPassword = 'Password is required';
        if (!companyConfirmPassword) errors.companyConfirmPassword = 'Confirm password is required';
        if (companyPassword !== companyConfirmPassword) errors.companyConfirmPassword = 'Passwords do not match';
        if (!companyVerification) errors.companyVerification = 'Verification file is required';
        if (!companyDescription) errors.companyDescription = 'Description file is required';
        if (!companyLogo) errors.companyLogo = 'Logo file is required';

        if (Object.keys(errors).length > 0) {
            setCompanyFormErrors(errors);
        } else {
            // Send POST request to register company

            // const verificationFilePath = companyVerification ? companyVerification.name : '';  // Get the file name from the file object
            // const LogoPath = companyLogo ? companyLogo.name : '';

            // const response = await fetch('http://localhost:3001/api/register', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         userType: 'company',  // Make sure userType is correctly set to 'company'
            //         companyName,
            //         companySector,
            //         companyUsername,
            //         companyEmail,
            //         companyPassword,
            //         companyConfirmPassword,
            //         companyVerification: verificationFilePath,
            //         companyDescription,
            //         companyLogo: LogoPath,
            //         registrationStatus: 'pending'
            //     }),
            // });

            // Prepare the form data to be sent in a POST request
            const formData = new FormData();
            formData.append('userType', 'company');
            formData.append('companyName', companyName);
            formData.append('companySector', companySector);
            formData.append('companyUsername', companyUsername);
            formData.append('companyEmail', companyEmail);
            formData.append('companyPassword', companyPassword);
            formData.append('companyConfirmPassword', companyConfirmPassword);
            formData.append('companyDescription', companyDescription);
            formData.append('registrationStatus', 'pending');

            // Append files (for logo and verification)
            if (companyLogo) {
                formData.append('companyLogo', companyLogo);
            }
            if (companyVerification) {
                formData.append('companyVerification', companyVerification);
            }

            // Send the POST request with FormData (multipart/form-data)
            const response = await fetch(`${REACT_APP_API_URL}/api/register`, {
                method: 'POST',
                body: formData,  // Notice that we pass the FormData object here
            });

            const data = await response.json();

            if (response.ok) {
                setCompanyShowAlert(true);
                setTimeout(() => setCompanyShowAlert(false), 10000);

                // Clear form fields
                setCompanyName('');
                setCompanySector('');
                setCompanyUsername('');
                setCompanyEmail('');
                setCompanyPassword('');
                setCompanyConfirmPassword('');
                setCompanyVerification(null);
                setCompanyDescription('');
                setCompanyLogo(null);
            }
        }
    }


    return (
        <Container className="p-3 my-5 d-flex flex-column w-50">
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 register-tab-title"
                justify

            >
                <Tab eventKey="register" title="Register as Student">
                    <p>Register as a Student</p>

                    <Alter
                        show={showStudentAlert}
                        message="Student registered successfully!"
                        variant="success"
                        onClose={() => setSrudentShowAlert(false)} // Close the alert
                    />

                    <Form onSubmit={studentHandleSubmit}>
                        {/* Full Name */}
                        <Form.Group className="mb-3" controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={studentFullName}
                                onChange={(e) => setStudentFullName(e.target.value)}
                            />
                            {studentFormErrors.studentFullName && <Form.Text className="text-danger">{studentFormErrors.studentFullName}</Form.Text>}
                        </Form.Group>

                        {/* Username */}
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="studentUsername"
                                placeholder="Enter username"
                                value={studentUsername}
                                onChange={(e) => setStudentUsername(e.target.value)}
                            />
                            {studentFormErrors.studentUsername && <Form.Text className="text-danger">{studentFormErrors.studentUsername}</Form.Text>}
                        </Form.Group>

                        {/* Email */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="studentEmail"
                                placeholder="Enter email address"
                                value={studentEmail}
                                onChange={(e) => setStudentEmail(e.target.value)}
                            />
                            {studentFormErrors.studentEmail && <Form.Text className="text-danger">{studentFormErrors.studentEmail}</Form.Text>}
                        </Form.Group>

                        {/* Password */}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="studentPassword"
                                placeholder="Enter your password"
                                value={studentPassword}
                                onChange={(e) => setStudentPassword(e.target.value)}
                            />
                            {studentFormErrors.studentPassword && <Form.Text className="text-danger">{studentFormErrors.studentPassword}</Form.Text>}
                        </Form.Group>

                        {/* Confirm Password */}
                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="studentConfirmPassword"
                                placeholder="Confirm your password"
                                value={studentConfirmPassword}
                                onChange={(e) => setStudentConfirmPassword(e.target.value)}
                            />
                            {studentFormErrors.studentConfirmPassword && <Form.Text className="text-danger">{studentFormErrors.studentConfirmPassword}</Form.Text>}
                        </Form.Group>

                        {/* University */}
                        <Form.Group className="mb-3" controlId="formUniversity">
                            <Form.Label>University</Form.Label>
                            <Form.Control
                                type="text"
                                name="studentUniversity"
                                placeholder="Enter your university"
                                value={studentUniversity}
                                onChange={(e) => setStudentUniversity(e.target.value)}
                            />
                            {studentFormErrors.studentUniversity && <Form.Text className="text-danger">{studentFormErrors.studentUniversity}</Form.Text>}
                        </Form.Group>

                        {/* Major */}
                        <Form.Group className="mb-3" controlId="formMajor">
                            <Form.Label>Major</Form.Label>
                            <Form.Control
                                type="text"
                                name="studentMajor"
                                placeholder="Enter your major"
                                value={studentMajor}
                                onChange={(e) => setStudentMajor(e.target.value)}
                            />
                            {studentFormErrors.studentMajor && <Form.Text className="text-danger">{studentFormErrors.studentMajor}</Form.Text>}
                        </Form.Group>

                        {/* Location */}
                        <Form.Group className="mb-3" controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="studentLocation"
                                value={studentLocation}
                                onChange={(e) => setStudentLocation(e.target.value)}
                                placeholder='Country-Region-City'
                            >
                            </Form.Control>
                            {studentFormErrors.studentLocation && <Form.Text className="text-danger">{studentFormErrors.studentLocation}</Form.Text>}
                        </Form.Group>

                        {/* Submit Button */}
                        <Button variant="primary" type="submit" className="def-button">
                            Sign up
                        </Button>
                    </Form>
                </Tab>

                <Tab eventKey="companyRegister" title="Register as Company">
                    <p>Register as a Company</p>
                    <Alter
                        show={showCompanyAlert}
                        message="Company registered successfully! You'll receive a message when your account is approved."
                        variant="success"
                        onClose={() => setCompanyShowAlert(false)} // Close the alert
                    />
                    <Form onSubmit={companyHandleSubmit}>
                        {/* Company Name */}
                        <Form.Group className="mb-3" controlId="formCompanyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="companyName"
                                placeholder="Enter your company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            {companyFormErrors.companyName && <Form.Text className="text-danger">{companyFormErrors.companyName}</Form.Text>}
                        </Form.Group>

                        {/* Sector */}
                        <Form.Group className="mb-3" controlId="formSector">
                            <Form.Label>Sector</Form.Label>
                            <Form.Control
                                type="text"
                                name="companySector"
                                placeholder="Enter your sector"
                                value={companySector}
                                onChange={(e) => setCompanySector(e.target.value)}
                            />
                            {companyFormErrors.companySector && <Form.Text className="text-danger">{companyFormErrors.companySector}</Form.Text>}
                        </Form.Group>

                        {/* Username */}
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="companyUsername"
                                placeholder="Enter username"
                                value={companyUsername}
                                onChange={(e) => setCompanyUsername(e.target.value)}
                            />
                            {companyFormErrors.companyUsername && <Form.Text className="text-danger">{companyFormErrors.companyUsername}</Form.Text>}
                        </Form.Group>


                        {/* Email */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="companyEmail"
                                placeholder="Enter email address"
                                value={companyEmail}
                                onChange={(e) => setCompanyEmail(e.target.value)}
                            />
                            {companyFormErrors.companyEmail && <Form.Text className="text-danger">{companyFormErrors.companyEmail}</Form.Text>}
                        </Form.Group>

                        {/* Password */}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name=" companyPassword"
                                placeholder="Enter your password"
                                value={companyPassword}
                                onChange={(e) => setCompanyPassword(e.target.value)}
                            />
                            {companyFormErrors.companyPassword && <Form.Text className="text-danger">{companyFormErrors.companyPassword}</Form.Text>}
                        </Form.Group>

                        {/* Confirm Password */}
                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="companyConfirmPassword"
                                placeholder="Confirm your password"
                                value={companyConfirmPassword}
                                onChange={(e) => setCompanyConfirmPassword(e.target.value)}
                            />
                            {companyFormErrors.companyConfirmPassword && <Form.Text className="text-danger">{companyFormErrors.companyConfirmPassword}</Form.Text>}
                        </Form.Group>

                        {/* Description */}
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Company's Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="companyDescription"
                                placeholder="Enter Company's Description"
                                value={companyDescription}
                                onChange={(e) => setCompanyDescription(e.target.value)}
                            />
                            {companyFormErrors.companyDescription && <Form.Text className="text-danger">{companyFormErrors.companyDescription}</Form.Text>}
                        </Form.Group>

                        {/* Upload Verification */}
                        {/* <Form.Group controlId="verification" className="mb-4">
                            <Form.Label> Upload verification of the company</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setCompanyVerification(e.target.files[0])}
                            />
                            {companyFormErrors.companyVerification && <Form.Text className="text-danger">{companyFormErrors.companyVerification}</Form.Text>}
                        </Form.Group> */}
                        <Form.Group controlId="verification" className="mb-4">
                            <Form.Label>Upload verification of the company</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        // Validate file type
                                        const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
                                        const validSize = 5 * 1024 * 1024; // 5MB size limit

                                        // Check if the file type is valid
                                        if (!validFileTypes.includes(file.type)) {
                                            alert('Invalid file type! Only JPEG, PNG, GIF, or PDF are allowed.');
                                            setCompanyVerification(null); // Clear the invalid file
                                            return;
                                        }

                                        // Check if the file size is within the limit
                                        if (file.size > validSize) {
                                            alert('File size is too large! Maximum allowed size is 5MB.');
                                            setCompanyVerification(null); // Clear the file if size is too large
                                            return;
                                        }

                                        setCompanyVerification(file);  // Only set valid files
                                    }
                                }}
                            />
                            {companyFormErrors.companyVerification && (
                                <Form.Text className="text-danger">{companyFormErrors.companyVerification}</Form.Text>
                            )}
                        </Form.Group>


                        {/* Upload Logo */}
                        <Form.Group controlId="logo" className="mb-4">
                            <Form.Label> Upload the logo of the company</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setCompanyLogo(e.target.files[0])}
                            />
                            {companyFormErrors.companyLogo && <Form.Text className="text-danger">{companyFormErrors.companyLogo}</Form.Text>}
                        </Form.Group>

                        {/* Submit Button */}
                        <Button variant="primary" type="submit" className="def-button">
                            Sign up
                        </Button>
                    </Form>

                </Tab>
            </Tabs>
        </Container>
    );
}

export default Register;
