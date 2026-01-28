import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientDashboard from './pages/PatientDashboard';
import TreatmentsPage from './pages/TreatmentsPage';
import TreatmentDetailsPage from './pages/TreatmentDetailsPage';
import { useSelector } from 'react-redux';

// Protected Route Component (Inline for simplicity now, can be moved to separate file)
const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/treatments" element={<TreatmentsPage />} />
          <Route path="/treatments/:id" element={<TreatmentDetailsPage />} />
          <Route path="/patient-dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
