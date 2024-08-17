export default function Header() {
  return (
    <header className="bg-header-gradient flex h-[70px] w-full items-center justify-between px-[120px] text-white">
      <a href="/" className="text-[24px] font-bold">
        에프터밀
      </a>
      <nav className="">
        <ul className="flex gap-x-[3.5rem]">
          <li>
            <a
              href="/login"
              className="transition duration-300 ease-in-out hover:text-[#ffdd55]"
            >
              로그인
            </a>
          </li>
          <li>
            <a
              href="/signup"
              className="transition duration-300 ease-in-out hover:text-[#ffdd55]"
            >
              회원가입
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
