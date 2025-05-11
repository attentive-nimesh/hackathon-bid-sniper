import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export default function ProtectedRoute({ children }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar />
      <main className={'bg-gray-200 min-h-screen'}>{children}</main>
    </div>
  );
}
