import { useLocation } from 'react-router-dom';
import { Header } from '../header';
import Path from '../../routes/path';
import Routing from '../../routes/routing';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin');

  const isNormalDomain =
    location.pathname !== Path.LoginPage &&
    location.pathname !== Path.SignupPage &&
    !isAdminPage;

  return (
    <>
      {isNormalDomain && <Header />}
      <Toaster
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <Routing />
    </>
  );
}
