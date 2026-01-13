import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../services/userApi";

const publicRoutes = ["/login", "/register", "/verify-email"];

const ProtectedWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isFetching } = useGetUserQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicRoute = publicRoutes.includes(location.pathname);
  const isAuthenticated = !!data?.data?._id;

  useEffect(() => {
    if (isLoading || isFetching) return;

    if (!isPublicRoute && !isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    if (isPublicRoute && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isLoading, isFetching, isPublicRoute, isAuthenticated, navigate]);

  if (!isPublicRoute && (isLoading || isFetching)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedWrapper;
