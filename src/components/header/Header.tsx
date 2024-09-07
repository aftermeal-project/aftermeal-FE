import { useNavigate } from 'react-router-dom';
import Token from '../../libs/utils/token';

export default function Header() {
  const navigate = useNavigate();
  const token = new Token();

  function onLogout() {
    token.removeUser();
    alert('로그아웃 되었습니다.');
    navigate('/login');
  }

  return (
    <header className="relative flex h-16 w-full items-center bg-header-gradient px-4 sm:h-20 lg:h-24">
      <div className="relative mx-auto flex w-full max-w-screen-xl items-center justify-between text-white">
        <div className="flex items-center gap-x-3">
          <img
            src="/after-meal.png"
            alt="logo"
            className="h-12 w-12 cursor-pointer rounded-full border-2 border-white object-cover"
            onClick={() => navigate('/')}
          />
          <a href="/" className="text-2xl font-bold sm:text-3xl">
            에프터밀
          </a>
        </div>
        <nav>
          <ul className="flex space-x-6 text-base sm:text-lg">
            {token.getLocalAccessToken() ? (
              <li>
                <span
                  onClick={onLogout}
                  className="cursor-pointer transition duration-300 ease-in-out hover:text-yellow-400 active:text-yellow-500"
                >
                  로그아웃
                </span>
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
