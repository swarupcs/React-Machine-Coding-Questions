import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AuthenticatedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (user) return <Navigate to='/dashboard' replace />;

  return children;
};

export default AuthenticatedRoute;
