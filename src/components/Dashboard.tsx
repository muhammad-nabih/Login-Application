import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed To Logout");
    }
  };

  return (
    <>
      <Card>
        <Card.Header>PROFILE </Card.Header>

        {error && <Alert variant="danger">{error}</Alert>}
        <Card.Body>
          <strong className="bg-dark text-white p-2 fs-4  rounded d-flex justify-content-between overflow-hidden  ">
            Email:
            <span className="text-primary text-wrap">{currentUser?.email}</span>
          </strong>
        </Card.Body>
        <Card.Footer>
          <Link
            to="/update-profile"
            className="btn btn-outline-primary w-100 my-3"
          >
            Update Profile ↺
          </Link>

          <Button onClick={handleLogOut} variant="primary w-100">
            Log out 🏃
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Dashboard;
