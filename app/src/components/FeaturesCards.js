// GroupExample.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';


function FeaturesCards() { 
  return (
    <CardGroup>
      <Card  style={{ border: '2px solid #FFD419', marginRight: '10px' }}>
        <Card.Img variant="top" src="./searching.svg" /> {/* Replace with your image path */}
        <Card.Body>
          <Card.Title>Searching</Card.Title>
          <Card.Text>
            Discover verified internship opportunities tailored to your career path.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card  style={{ border: '2px solid #FFB608',marginRight: '10px'  }}>
        <Card.Img variant="top" src="track.svg" /> {/* Replace with your image path */}
        <Card.Body>
          <Card.Title>Tracking</Card.Title>
          <Card.Text>
            Receive real-time updates on your application status and progress.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card  style={{ border: '2px solid #E28900',marginRight: '10px'  }}>
        <Card.Img variant="top" src="./rating.svg" /> {/* Replace with your image path */}
        <Card.Body>
          <Card.Title>Rating</Card.Title>
          <Card.Text>
            Students can rate internship opportunities based on their experiences, and companies can respond to the feedback, enhancing transparency and trust.
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

export default FeaturesCards;
