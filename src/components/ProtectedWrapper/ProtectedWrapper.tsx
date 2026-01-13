import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../services/userApi";
import { useEffect } from "react";

const ProtectedWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useGetUserQuery(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (isError || !data?.data._id) {
      navigate("/login", { replace: true });
    }
  }, [isError, data, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedWrapper;
