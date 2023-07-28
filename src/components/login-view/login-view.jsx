import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();
    
        const data = {
            Username: Username,
            Password: Password
        };
      
        fetch("https://myflixmovieapp-3df5d197457c.herokuapp.com/login.json", {
            method: "POST",
            body: JSON.stringify(data)
          }).then((response) => {
            if (response.ok) {
              onLoggedIn(Username);
            } else {
              alert("Login failed");
            }
          });
        };
      
    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            />
        </Form.Group>
    
        <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit, dude
        </Button>
        </Form>
    );
};
      