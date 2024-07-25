import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRef, useState } from "react";

interface Props {}

const ForgotPassword: React.FC<Props> = () => {
  const { generatePasswordResetLink } = useAuth();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!emailRef.current?.value) {
      setError("Email Is Required for Reset Password");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await generatePasswordResetLink(emailRef.current.value);
      setMessage("Check Your Inbox Email To Reset Password");
    } catch {
      setError("Failed To Reset Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>Reset Password</Card.Header>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Card.Body className="text-start">
          <Form onSubmit={handleResetPassword}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
              />
            </Form.Group>

            <Button
              className="w-100"
              variant="primary"
              type="submit"
              disabled={loading}
            >
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
