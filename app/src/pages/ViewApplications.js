import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApplicantCard from "../components/ApplicantCard.js";
import Header from "../components/Header.js";
import Navbar from "../components/Navbar.js";

export default function ViewApplications() {
  const title = "Job Applicants";
  const applicant1 = {
    imgSrc: "/imgs/applicant1.png",
    title: "Fatima Al-Dossari",
    content: (
      <>
        <p>
          <strong>Field:</strong> Computer Science
        </p>
        <p>
          <strong>University:</strong> King Saud University
        </p>
        <p>
          <strong>Summary:</strong> Enthusiastic computer science student with a
          passion for full-stack development. Built a campus event app using
          React and Firebase.
        </p>
        <p>
          <strong>Skills:</strong> JavaScript, React, Node.js, Firebase
        </p>
      </>
    ),
    link: "/applicant-details/1",
  };

  const applicant2 = {
    imgSrc: "/imgs/applicant2.png",
    title: "Ahmed Al-Saud",
    content: (
      <>
        <p>
          <strong>Field:</strong> Software Engineering
        </p>
        <p>
          <strong>University:</strong> King Fahd University
        </p>
        <p>
          <strong>Summary:</strong> Experienced software engineer with expertise
          in mobile app development. Created several successful iOS and Android
          applications.
        </p>
        <p>
          <strong>Skills:</strong> Swift, Kotlin, Java, Python
        </p>
      </>
    ),
    link: "/applicant-details/2",
  };

  const applicant3 = {
    imgSrc: "/imgs/applicant3.png",
    title: "Omar Al-Harbi",
    content: (
      <>
        <p>
          <strong>Field:</strong> Information Systems
        </p>
        <p>
          <strong>University:</strong> KFUPM
        </p>
        <p>
          <strong>Summary:</strong> Data-driven and analytical thinker with
          internship experience in business analytics. Loves turning data into
          insights.
        </p>
        <p>
          <strong>Skills:</strong> Python, SQL, Power BI, Excel
        </p>
      </>
    ),
    link: "/applicant-details/3",
  };

  const applicant4 = {
    imgSrc: "/imgs/applicant4.png",
    title: "Nouf Al-Qahtani",
    content: (
      <>
        <p>
          <strong>Field:</strong> Software Engineering
        </p>
        <p>
          <strong>University:</strong> Prince Sultan University
        </p>
        <p>
          <strong>Summary:</strong> Creative problem solver and team player.
          Developed a secure login system as part of a cybersecurity course.
        </p>
        <p>
          <strong>Skills:</strong> Java, Python, Git, OWASP
        </p>
      </>
    ),
    link: "/applicant-details/4",
  };

  return (
    <Container
      style={{ display: "flex", justifyContent: "center", paddingTop: "80px" }}
    >
      <Row className="justify-content-center">
        <Col>
          <Navbar />
          <Header title={title} />
          <ApplicantCard {...applicant1} />
          <ApplicantCard {...applicant2} />
          <ApplicantCard {...applicant4} />
          <ApplicantCard {...applicant3} />
        </Col>
      </Row>
    </Container>
  );
}
