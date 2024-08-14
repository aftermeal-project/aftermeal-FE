import { Routes, Route } from 'react-router-dom';
import Path from './path';
import HomePage from '../domains/home/page';
import LoginPage from '../domains/login/page';
import SignupPage from '../domains/signup/page';

export default function Routing() {
  return (
    <Routes>
      <Route path={Path.HomePage} element={<HomePage />} />
      <Route path={Path.LoginPage} element={<LoginPage />} />
      <Route path={Path.SignupPage} element={<SignupPage />} />
    </Routes>
  );
}
