import { Navigate } from 'react-router-dom';

export function HomeRedirectPage() {
  return <Navigate to="/" replace />;
}