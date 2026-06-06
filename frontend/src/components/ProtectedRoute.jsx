import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
  const userStr = localStorage.getItem('user');

  if (!userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    JSON.parse(userStr);
    return <Outlet />;
  } catch {
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
