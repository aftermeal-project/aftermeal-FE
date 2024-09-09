import { Routes, Route } from 'react-router-dom';
import Path from './path';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import NotFoundPage from '../pages/not-found/NotFoundPage';
import AdminPage from '../pages/admin/AdminPage';
import ActivityDetailsPage from '../pages/activity-details/ActivityDetailsPage';

export default function Routing() {
  return (
    <Routes>
      <Route path={Path.HomePage} element={<HomePage />} />
      <Route
        path={Path.ActivityDetailsPage}
        element={<ActivityDetailsPage />}
      />
      <Route path={Path.LoginPage} element={<LoginPage />} />
      <Route path={Path.SignupPage} element={<SignupPage />} />
      <Route path={Path.AdminPage} element={<AdminPage />} />
      <Route path={Path.NotFoundPage} element={<NotFoundPage />} />
    </Routes>
  );
}
