import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {}

const LogIn: React.FC<Props> = () => {
  return (
    <>
      <Card className="text-center">
        <Card.Header>Log In</Card.Header>
        <Card.Body className="text-start">
          <Form>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" className="w-100" type="submit">
              Log In
            </Button>{" "}
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
