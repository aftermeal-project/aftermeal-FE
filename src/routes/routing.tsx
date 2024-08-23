import { Routes, Route } from 'react-router-dom';
import Path from './path';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import NotFoundPage from '../pages/not-found/NotFoundPage';

export default function Routing() {
  return (
    <Routes>
      <Route path={Path.HomePage} element={<HomePage />} />
      <Route path={Path.LoginPage} element={<LoginPage />} />
      <Route path={Path.SignupPage} element={<SignupPage />} />
      <Route path={Path.NotFoundPage} element={<NotFoundPage />} />
    </Routes>
  );
}
