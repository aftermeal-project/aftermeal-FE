import { useNavigate } from 'react-router-dom';
import Token from '../../libs/utils/token';
import toast from 'react-hot-toast';

export default function Header() {
  const navigate = useNavigate();
  const token = new Token();

  const handleLogout = () => {
    token.removeUser();
    toast.success('로그아웃 되었습니다');
    navigate('/login');
  };

  return (
    <header className="relative flex items-center w-full h-16 px-4 bg-header-gradient sm:h-20 lg:h-24">
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
                <span
                  onClick={handleLogout}
                  className="transition duration-300 ease-in-out cursor-pointer hover:text-yellow-400 active:text-yellow-500"
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
