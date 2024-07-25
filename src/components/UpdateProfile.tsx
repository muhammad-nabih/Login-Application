import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Alert } from "react-bootstrap";

interface Props {}

// Component to handle updating profile
const UpdateProfile: React.FC<Props> = () => {
  // Get the updateUserEmail, updateUserPassword, and currentUser from the auth context
  const { updateUserEmail, updateUserPassword, currentUser } = useAuth();

  // References to form input fields
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  // State to handle error messages
  const [error, setError] = useState<string>("");
  // State to handle loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Navigation hook from react-router-dom
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if all fields are filled
    if (
      emailRef.current?.value &&
      passwordRef.current?.value &&
      passwordConfirmRef.current?.value
    ) {
      // Check if passwords match
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        setError("Passwords do not match");
        setTimeout(() => setError(""), 2000); // Clear error after 2 seconds
        return;
      }

      // Set loading state
      setLoading(true);

      // Update profile with email and password
      const promises: Promise<void>[] = [];

      if (emailRef.current.value !== currentUser?.email) {
        promises.push(updateUserEmail(emailRef.current.value));
      }

      if (passwordRef.current.value) {
        console.log("Password updated");
        promises.push(updateUserPassword(passwordRef.current.value));
        console.log("Password updated++++++++++");
      }

      Promise.all(promises)
        .then(() => {
          console.log("good promise");
          navigate("/"); // Redirect to homepage
          console.log(promises);
        })
        .catch((err) => {
          console.error("Error updating profile:", err);

          setError("Failed to update the profile");
          setTimeout(() => setError(""), 2000); // Clear error after 2 seconds
        })
        .finally(() => {
          setLoading(false); // Reset loading state
        });
    } else {
      setError("Please fill in all fields");
      setTimeout(() => setError(""), 2000); // Clear error after 2 seconds
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>Update Profile</Card.Header>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card.Body className="text-start">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
              defaultValue={currentUser?.email || ""}
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
            Update Profile
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UpdateProfile;
