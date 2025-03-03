import {React, useState } from "react";
import { Container, Form, Button  } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const JavaProject = () => {
    const [formData, setFormData] = useState({
        projectName: "",
        jdkVersion: "",
        springBootVersion: "",
        groupId: "",
        artifactId: "",
        projectVersion: ""
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const [data, setData] = useState([]);
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState(null);
          
            //console.log("Data:", JSON.stringify(formData));
    
            const handleSubmit = async (e) => {
              e.preventDefault();
              setLoading(true);
              setError(null);
          
              try {
                const response = await fetch("http://localhost:8080/createProjectFromArchetype", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                  },
                  body: JSON.stringify(formData),
                });
          
                if (!response.ok) {
                  throw new Error("Failed to submit data");
                }
          
                const result = await response.json();
                console.log("Success:", result);
                alert("Form submitted successfully!");
              } catch (err) {
                console.error("Error:", err);
                setError(err.message);
              } finally {
                setLoading(false);
              }
            };
  
    return (
      <Container className="form-div">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="JDK version"
              name="jdkVersion"
              value={formData.jdkVersion}
              onChange={handleChange}
              aria-required
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="SpringBoot Version"
              name="springBootVersion"
              value={formData.springBootVersion}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="GroupID"
              name="groupId"
              value={formData.groupId}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="ArtifactID"
              name="artifactId"
              value={formData.artifactId}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Project Version"
              name="projectVersion"
              value={formData.projectVersion}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Container>
    );
  };

  export default JavaProject;