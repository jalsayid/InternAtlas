import Nav from 'react-bootstrap/Nav';
import React, { useState } from 'react';
import ManageApplications from './ManageApplications.js'
import TrackProfiles from './TrackProfiles.js';
import TrackComments from "./TrackComments.js";


function ModerateContentNav() {
    const [activeTab, setActiveTab] = useState('ManageApplications');

    const renderTabContent = () => {
      switch (activeTab) {
        case 'ManageApplications':
          return <ManageApplications />;
        case 'TrackComments':
          return <TrackComments />;
        case 'TrackProfiles':
          return <TrackProfiles />;
        default:
          return <ManageApplications />;
      }
    };
  

        
  return (
    <>
    <Nav fill variant="tabs" defaultActiveKey="TrackApplications" onSelect={(selectedKey) => setActiveTab(selectedKey)}>
      <Nav.Item>
        <Nav.Link eventKey="TrackApplications">Manage Job Applications</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="TrackComments">Manage Comments</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="TrackProfiles">Manage Companies Profiles</Nav.Link>
      </Nav.Item>
    </Nav>
    <div className="mt-4">
        {renderTabContent()}
      </div>
    </>
  );
}

export default ModerateContentNav;