import { Container } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import UpdateProfile from "./components/UpdateProfile";
import ForgotPassword from "./components/ForgotPassword";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./context/RequireAuth";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100  ">
      <AuthProvider>
        <div className="w-100 p-4 rounded bg-light" style={{ maxWidth: "90%" }}>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-profile" element={<UpdateProfile />} />

              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Dashboard />{" "}
                  </RequireAuth>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </Container>
  );
};

export default App;
