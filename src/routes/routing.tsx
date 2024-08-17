import { Routes, Route } from 'react-router-dom';
import Path from './path';
import HomePage from '../pages/home';
import LoginPage from '../pages/auth/login';
import SignupPage from '../pages/auth/signup';

export default function Routing() {
  return (
    <Routes>
      <Route path={Path.HomePage} element={<HomePage />} />
      <Route path={Path.LoginPage} element={<LoginPage />} />
      <Route path={Path.SignupPage} element={<SignupPage />} />
    </Routes>
  );
}
