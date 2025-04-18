import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CompanyInfoCard from "../components/CompanyInfoCard";
import Header from "../components/Header";
import AdminNavbar from '../AdminNavbar.js'; // ✅ Correct NavBar imported

export default function ReviewCompany() {
  const stc = {
    title: "STC",
    info: (
      <>
        <p>Saudi Telecom Company offering internships in network engineering, AI, and software development.</p>
        <p><span className="pending-badge">pending</span></p>
      </>
    ),
    image: "/imgs/stc.avif",
    link: "/companies/stc",
  };

  const neom = {
    title: "NEOM",
    info: (
      <>
        <p>A futuristic city project shaping the future of innovation and sustainability. Neom is an arcology and planned city</p>
        <p><span className="pending-badge">pending</span></p>
      </>
    ),
    image: "/imgs/neom.jpg",
    link: "/companies/neom",
  };

  const noon = {
    title: "Noon",
    info: (
      <>
        <p>E-commerce leader in MENA offering roles in data analysis, software engineering, and UX design.</p>
        <p><span className="pending-badge">pending</span></p>
      </>
    ),
    image: "./imgs/noon.png",
    link: "/companies/noon",
  };

  const tawuniya = {
    title: "Tawuniya",
    info: (
      <>
        <p>A leading insurance company embracing digital transformation with AI, cybersecurity, and app dev internships.</p>
        <p><span className="pending-badge">pending</span></p>
      </>
    ),
    image: "./imgs/taw.png",
    link: "/companies/tawuniya",
  };

  return (
    <>
      <AdminNavbar /> 

      <Container fluid style={{ paddingTop: "80px" }}>
        <Header title="Manage Company Requests" />

        <Row className="g-4 px-4">
          <Col lg={3} md={6} sm={12}>
            <CompanyInfoCard {...stc} />
          </Col>
          <Col lg={3} md={6} sm={12}>
            <CompanyInfoCard {...neom} />
          </Col>
          <Col lg={3} md={6} sm={12}>
            <CompanyInfoCard {...noon} />
          </Col>
          <Col lg={3} md={6} sm={12}>
            <CompanyInfoCard {...tawuniya} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
