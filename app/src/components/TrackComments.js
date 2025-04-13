import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import TrackCommentsCard from './TrackCommentsCard.js';
import { invalidCompanyRatings } from '../dummyData'; 


function TrackComments() {
    const [search, setSearch] = useState("");
    const [comments, setCommenents] = useState(invalidCompanyRatings);
    const handleDelete = (id) => {
      const confirmAction = window.confirm("Are you sure you want to delete this item?");
      if (confirmAction) {
        const updated = comments.filter(comment => comment.id !== id);
        setCommenents(updated);
        alert("Item deleted!");
      } else {
        alert("Deletion canceled.");
      }
  
        
      };
    

  const filtered = comments.filter(app =>
    app.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="my-5" style={{ maxWidth: '1000px' }}>
      <h2 className="mb-4 text-center" style={{fontFamily: 'Roboto', fontSize: "40px"}}>Reborted Comments</h2>
      <Form className="mb-3 d-flex justify-content-center">
        <Form.Control
          type="text"
          placeholder="Search for a user"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{width:"300px", margin: "20px 20px"}}
        />
      </Form>

      {filtered.map(app => (
        <TrackCommentsCard
          key={app.id}
          app={app}
          onDelete={handleDelete}
        />
      ))}
      


    </Container>
  );
}

export default TrackComments;