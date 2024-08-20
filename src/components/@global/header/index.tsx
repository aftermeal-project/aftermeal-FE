export default function Header() {
  return (
    <header className="relative flex items-center w-full h-16 px-4 bg-header-gradient sm:h-20 lg:h-24">
      <div className="relative flex items-center justify-between w-full max-w-screen-xl mx-auto text-white">
        <div className="flex items-center gap-x-3">
          <img
            src="/after-meal.png"
            alt="logo"
            className="w-12 h-12 border-2 border-white rounded-full"
          />
          <a href="/" className="text-2xl font-bold sm:text-3xl">
            에프터밀
          </a>
        </div>
        <nav>
          <ul className="flex space-x-6 text-base sm:text-lg">
            <li>
              <a
                href="/login"
                className="transition duration-300 ease-in-out hover:text-yellow-400 active:text-yellow-500"
              >
                로그인
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
