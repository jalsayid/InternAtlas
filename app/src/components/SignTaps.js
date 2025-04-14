import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login.js';
import Register from './Register.js';
import '../formsStyles.css';


import React, { useState } from 'react';

import { Container, Tabs, Tab } from 'react-bootstrap';


function SignTaps() {
  const [key, setKey] = useState('login');

  return (
    <>
    <Container className="p-3 my-5">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        justify
      >
        <Tab eventKey="login" title="Login">
         <Login/>
        </Tab>
        <Tab eventKey="register" title="Register">
          <Register />
        </Tab>
      </Tabs>
    </Container>
    </>
  );
}

export default SignTaps;
