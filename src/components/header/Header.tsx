import { ConfirmLogoutModal, ProfileDropdown } from '..';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ModalAtomFamily, UserAtom } from '../../atoms';
import { AtomKeys } from '../../constants';
import { useNavigate } from 'react-router-dom';
import Token from '../../libs/utils/token';

export default function Header() {
  const navigate = useNavigate();
  const token = new Token();
  const user = useRecoilValue(UserAtom);

  const [logoutModalOpen, setLogoutModalOpen] = useRecoilState(
    ModalAtomFamily(AtomKeys.LOGOUT_MODAL),
  );

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  const handleNavigateToAdminPage = () => {
    navigate('/admin');
  };

  return (
    <header className="relative flex items-center w-full h-16 px-4 bg-header-gradient sm:h-20 lg:h-24">
      {logoutModalOpen && <ConfirmLogoutModal />}
      <div className="relative mx-auto flex w-full max-w-[1000px] items-center justify-between text-white">
        <div className="flex items-center gap-x-3">
          <img
            src="/after-meal.png"
            alt="logo"
            className="object-cover border-2 border-white rounded-full cursor-pointer h-11 w-11"
            onClick={() => navigate('/')}
          />
          <a href="/" className="text-[26px] font-bold">
            에프터밀
          </a>
        </div>
        <nav>
          <ul className="flex space-x-6 text-base sm:text-lg">
            {token.getLocalAccessToken() ? (
              <li>
                <ProfileDropdown
                  user={user}
                  onLogout={handleLogout}
                  onNavigateToAdminPage={handleNavigateToAdminPage}
                />
              </li>
            ) : (
              <li>
                <a
                  href="/login"
                  className="transition duration-300 ease-in-out hover:text-yellow-400 active:text-yellow-500"
                >
                  로그인
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
