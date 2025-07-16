import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [validUser, setValidUser] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.get("http://localhost:3001/UserAccounts");
    const user = res.data.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setValidUser(user.username);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/laptops");
      }, 1000);
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-3">Login</Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>Welcome, {validUser} login Successful!</Modal.Body>
      </Modal>
    </div>
  );
}

Login.propTypes = {
  setUser: PropTypes.func,
};

export default Login;
