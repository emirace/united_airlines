import { useUser } from "../../context/user";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import Loading from "./loading";

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return user ? <Outlet /> : null;
};

export default ProtectedRoute;
