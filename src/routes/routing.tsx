import { Routes, Route } from 'react-router-dom';
import Path from './path';
import HomePage from '../pages/home';
import LoginPage from '../pages/auth/login';
import SignupPage from '../pages/auth/signup';
import NotFoundPage from '../pages/not-found ';

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
