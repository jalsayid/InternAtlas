// LandingPage.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import FeaturesCards from "../components/FeaturesCards" 
import '../landingPage.css';  
import TargetsAllCollapse from '../components/TargetsAllCollapse.js'
import Image from 'react-bootstrap/Image';
import LandingHeader from '../components/LandingHeader.js';


function LandingPage() {


    return (
        <div className="landing-page">

            <Card>
                <Image src="./imgs/landingLogo.svg" fluid style={{ paddingTop: 80 }} />
            </Card>

            {/* Overview Section */}
            <Container className="mt-5"style={{justifyContent:"center"}}>

                <LandingHeader />
                <Row>
                    <Col md={12}>
                        <h2>Overview</h2>
                        <p>
                            Finding and securing internships can be a challenging process for students, often
                            requiring extensive research and multiple applications across different platforms. At the
                            same time, companies struggle to find qualified candidates efficiently. InternAtlas
                            bridges this gap by providing a centralized platform where students can explore verified
                            internship opportunities and receive real-time updates on their applications.
                            <br /><br />
                            By streamlining the application process and ensuring company credibility, our solution
                            saves time for students and helps companies connect with suitable candidates more
                            effectively. This benefits both parties by making the hiring process more transparent,
                            accessible, and efficient, ultimately contributing to a stronger and more prepared workforce.
                        </p>
                    </Col>
                </Row>
            </Container>

            {/* Accordion Section */}
            <Container className="mt-5">
                <h2>Target</h2>
                <TargetsAllCollapse /> {/* Use the Accordion component */}
            </Container>

            {/* Features Section using GroupExample */}
            <Container className="mt-5">
                <h2>Features</h2>
                <FeaturesCards /> {/* Use GroupExample here */}
            </Container>

            <br/>

        </div>
    );
}

export default LandingPage;