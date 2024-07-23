import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {}

const ForgotPassword: React.FC<Props> = () => {
  return (
    <>
      <Card className="text-center">
        <Card.Header>Reset Password</Card.Header>
        <Card.Body className="text-start">
          <Form>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Button className="w-100" variant="primary" type="submit">
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
