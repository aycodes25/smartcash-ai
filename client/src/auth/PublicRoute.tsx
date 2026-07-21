import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface Props {
  children: React.ReactNode;
}

export default function PublicRoute({
  children,
}: Props) {
  const { session, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}