import {React } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import JavaProject from "./JavaProject";
import MuleSoftProject from "./MuleSoftProject";

const AppNavbar = () => {
  return (
    <Navbar className="App-header">
      <Container>
        <Navbar.Brand as={Link} to="/" className="App-logo">Bank Of America</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="navbar-link" as={Link} to="/">Home</Nav.Link>
            <Nav.Link className="navbar-link" as={Link} to="/java-project">Java Project</Nav.Link>
            <Nav.Link className="navbar-link" as={Link} to="/mule-project">MuleSoft Project</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const Home = () => <h2>Home Page</h2>;

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/java-project" element={<JavaProject />} />
          <Route path="/mule-project" element={<MuleSoftProject />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;