import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
function ApplicantCard({ imgSrc, title, content, link }) {
  return (
    <Card className="mb-4">
      <div className="d-flex flex-column flex-md-row">
        <Card.Img
          variant="left"
          src={imgSrc}
          alt="Applicant"
          style={{
            width: "100%",
            maxWidth: "200px",
            height: "200px",
            objectFit: "cover",
            alignSelf: "center",
            padding: "10px",
          }}
        />
        <Card.Body className="w-100">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "auto",
            }}
          >
            <Link to={link}>
              <button className="def-btn">View Details</button>
            </Link>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
}

export default ApplicantCard;
