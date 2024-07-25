import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Props {}

const LogIn: React.FC<Props> = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const { login } = useAuth();
  const location = useLocation();
  const redirectPath = (location.state as { path?: string })?.path || "/";

  const handleLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      setError("Email and password are required.");
      return;
    }
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      console.log("Login Successful");
      navigate(redirectPath, { replace: false });
    } catch {
      setError("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>Log In</Card.Header>
        {error && <Alert variant="danger">{error}</Alert>}
        <Card.Body className="text-start">
          <Form onSubmit={handleLogIn}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
              />
            </Form.Group>
            <Button
              variant="primary"
              className="w-100"
              type="submit"
              disabled={loading}
            >
              Log In
            </Button>
            <div className="w-100 text-center mt-3">
              <Link to={"/forgot-password"}>Forgot Password?</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Need an Account? <Link to={"/signup"}>Signup</Link>
      </div>
    </>
  );
};

export default LogIn;
