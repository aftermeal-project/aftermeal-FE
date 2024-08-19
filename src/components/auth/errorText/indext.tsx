interface AuthErrorTextProps {
  message?: string;
  margin?: string;
}

export default function AuthErrorText({
  message,
  margin = 'my-5',
}: AuthErrorTextProps) {
  if (!message) return null;

  return (
    <p
      className={`${margin} text-left text-[13px] leading-4 tracking-[-.75px] text-[#ff0101]`}
    >
      {message}
    </p>
  );
}
