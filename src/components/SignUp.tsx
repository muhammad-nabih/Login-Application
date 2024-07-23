import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {}

const SignUp: React.FC<Props> = () => {
  return (
    <>
      <Card className="text-center">
        <Card.Header>Signup</Card.Header>
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

            <Form.Group className="mb-2" controlId="formBasicPasswordConfirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" placeholder="Password Confirm" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Already have an account? <Link to={"/login"}>Log In</Link>
      </div>
    </>
  );
};

export default SignUp;
