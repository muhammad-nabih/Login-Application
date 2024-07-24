import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRef, useState } from "react";

interface Props {}

const SignUp: React.FC<Props> = () => {
  const { signup } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      emailRef.current?.value &&
      passwordRef.current?.value &&
      passwordConfirmRef.current?.value
    ) {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        setError("Passwords do not match");
        return; 
      }

      try {
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
        navigate("/");
      } catch (error) {
        setError("Failed to create an account");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please Fill In All Fields");
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>Signup</Card.Header>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card.Body className="text-start">
        <Form onSubmit={handleSubmit}>
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

          <Form.Group className="mb-2" controlId="formBasicPasswordConfirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password Confirm"
              ref={passwordConfirmRef}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            Signup
          </Button>
        </Form>
      </Card.Body>

      <div className="w-100 text-center mt-2">
        Already have an account? <Link to={"/login"}>Log In</Link>
      </div>
    </Card>
  );
};

export default SignUp;
