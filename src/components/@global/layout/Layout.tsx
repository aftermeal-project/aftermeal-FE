import { useLocation } from 'react-router-dom';
import Header from '../header/Header';
import Path from '../../../routes/path';
import Routing from '../../../routes/routing';

export default function Layout() {
  const location = useLocation();

  const isNotAuthDomain =
    location.pathname !== Path.LoginPage &&
    location.pathname !== Path.SignupPage;

  return (
    <>
      {isNotAuthDomain && <Header />}
      <Routing />
    </>
  );
}
