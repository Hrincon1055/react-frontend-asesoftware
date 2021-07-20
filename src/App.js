import React, { useState } from "react";
import { Container, Col, Row, Navbar } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Mis componentes
import FormClient from "./components/FormClient";
import Clients from "./components/Clients";
// Inicio
function App() {
  // state
  const [loading, setLoading] = useState(false);
  const [editC, seteditC] = useState(null);
  // returns
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React Asesoftware</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Container>
        <Row>
          <Col sm={4}>
            <FormClient
              loading={loading}
              setLoading={setLoading}
              editC={editC}
              seteditC={seteditC}
            />
          </Col>
          <Col sm={8}>
            <Clients
              loading={loading}
              setLoading={setLoading}
              editC={editC}
              seteditC={seteditC}
            />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
