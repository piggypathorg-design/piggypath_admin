import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PLBLogin from './pages/admin/PLBLogin';
import PLBDashboard from './pages/admin/PLBDashboard';
import PLBBuilder from './pages/admin/PLBBuilder';
import PLBCreateLesson from './pages/admin/PLBCreateLesson';

// A simple wrapper to protect routes
const RequireAuth = ({ children }) => {
  const user = localStorage.getItem('plb_user_v2');
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PLBLogin />} />
        
        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <RequireAuth>
              <PLBDashboard />
            </RequireAuth>
          } 
        />
        
        <Route 
          path="/create-lesson" 
          element={
            <RequireAuth>
              <PLBCreateLesson />
            </RequireAuth>
          } 
        />
        
        <Route 
          path="/builder/:id" 
          element={
            <RequireAuth>
              <PLBBuilder />
            </RequireAuth>
          } 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
