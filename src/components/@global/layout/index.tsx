import { useLocation } from 'react-router-dom';
import Routing from '../../../routes/routing';
import Header from '../header';
import Path from '../../../routes/path';

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
