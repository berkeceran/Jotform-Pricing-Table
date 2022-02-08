/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory, useLocation, Redirect } from "react-router-dom";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [loged, setLoged] = useState(false);
  let history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    let a = {
      email: email,
      password: password,
    };

    /*
    fetch("  https://i-seven.jotform.dev/intern-api/users/read_single?id=1")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if (
            result.content[0].email === email &&
            result.content[0].password === password
          ) {
            history.push("/intern/jr-revenue/admin/table");
          } else {
            alert("Email or Password is wrong");
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
      */

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(a),
    };
    fetch(
      `https://i-seven.jotform.dev/intern-api/users/validate`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) =>
        data.content === true
          ? history.push("/intern/jr-revenue/admin/table")
          : alert("Email or password is wrong")
      )
      .then(() => localStorage.setItem("logedIn", "true"));
  }

  return (
    <div>
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email (demo@jotform.com)</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password (demo)</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
