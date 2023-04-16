import { Navigate } from 'react-router-dom';

export function AuthGuard({ children }) {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  } else if (localStorage.getItem('role') !== 'Admin') {
    return <div>You are not authorized to access this URL</div>;
  } else {
    return children;
  }
}
