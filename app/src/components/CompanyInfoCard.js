import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function CompanyInfoCard({ title, info, image, link }) {
  return (
    <Card className="h-100" style={{ width: "100%" }}>
      <Card.Img variant="top" src={image} style={{ height: "200px", objectFit: "cover" }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text className="flex-grow-1">{info}</Card.Text>
        <Link to={link}>
          <button className="def-btn w-100">view details</button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CompanyInfoCard;