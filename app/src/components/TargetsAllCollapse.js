// AllCollapseExample.js
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

function TargetsAllCollapse() {
  return (
    <Accordion defaultActiveKey="0" className="mt-4">
      {/* Student Accordion Section */}
      <Accordion.Item eventKey="0">
        <Accordion.Header>Student</Accordion.Header>
        <Accordion.Body>
          Students on InternAtlas can explore various internship opportunities tailored to
          their interests and qualifications. They can utilize multi-criteria filters to find
          specific opportunities, submit applications seamlessly using prefilled information,
          and track their application progress in real time. Additionally, students can leave
          ratings and reviews based on their internship experiences and browse feedback
          from others to make informed decisions. To enhance user experience, students
          receive notifications regarding their application status, ensuring they stay updated
          on their internship journey.
        </Accordion.Body>
      </Accordion.Item>

      {/* Company Accordion Section */}
      <Accordion.Item eventKey="1">
        <Accordion.Header>Company</Accordion.Header>
        <Accordion.Body>
          Companies and organizations looking for creative minds in any industry and seeking to
          automate the intern selection process can easily save time and effort by using
          InternAtlas. Instead of struggling with the manual process of filtering students and the
          difficulty of communicating with interns. By using InternAtlas, companies can post
          opportunities, submit internship listings for approval, and check applications from
          students. They also have access to ratings and reviews left by interns, allowing them to
          improve their offerings. Additionally, they can update or remove job postings as
          needed.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default TargetsAllCollapse;
