import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

type Props = { children: React.ReactNode };

function RequireAuth({ children }: Props) {
  const location = useLocation();
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        state={{ path: location.pathname }}

      />
    );
  }

  return <>{children}</>;
}

export default RequireAuth;
