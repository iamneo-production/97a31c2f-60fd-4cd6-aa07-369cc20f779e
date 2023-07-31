import { Navigate } from 'react-router-dom';
import { store } from '../store';

export function AdminGuard({ children }) {
  
  // Get the current 'auth' state object from the store
  const { auth } = store.getState();
  
  // If the user is not authenticated, redirect them to the login page
  if (!auth.token) {
    return <Navigate to="/login" />;
  
  // If the user is authenticated but does not have admin access, show an error message
  } else if ( auth.role !== 'ADMIN') {
    return <div>You are not authorized to access this URL</div>;
  
  // If the user is authenticated and has admin access, render the 'children' prop
  } else {
    return children;
  }
}
