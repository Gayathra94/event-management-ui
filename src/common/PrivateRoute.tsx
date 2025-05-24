import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './UserContext';

export default function PrivateRoute() {
  const { user } = useUser();

  return user ? <Outlet /> : <Navigate to="/" replace />;
}
