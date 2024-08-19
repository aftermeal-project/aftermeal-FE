export default function Header() {
  return (
    <header className="flex h-[70px] w-full items-center justify-between bg-header-gradient px-[120px] text-white">
      <a href="/" className="text-[24px] font-bold">
        에프터밀
      </a>
      <nav className="">
        <ul className="flex">
          <li>
            <a
              href="/login"
              className="transition duration-300 ease-in-out hover:text-[#ffdd55]"
            >
              로그인
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
